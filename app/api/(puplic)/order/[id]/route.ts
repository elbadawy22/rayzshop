import { NextRequest, NextResponse } from "next/server";
import { requireAdminOrder } from "@/app/lib/middleware";
import prisma from "@/app/lib/prismaDb";
import { OrderStatus } from "@/app/generated/prisma/enums";

/**
 * @method PUT
 * @route /api/category/:id
 * @description Admin and product Update  Category
 * @access private
 */
async function updateOrder(req: NextRequest) {
  // get id from url
  const url = new URL(req.url);
  const orderId = url.pathname.split("/").pop();

  try {
    const data = await req.json();
    // check if found body
    if (
      typeof data?.status === "string" &&
      Object.values(OrderStatus).includes(data?.status.toUpperCase())
    ) {
      const status = data.status.toUpperCase() as OrderStatus;
      const order = await prisma.order.findUnique({
        where: {
          id: orderId,
        },
      });

      if (order) {
        if (order?.status.toUpperCase() !== status) {
          const updated = await prisma.order.update({
            where: {
              id: orderId,
            },
            data: {
              status: status || order.status,
            },
            include: {
              orderItems: {
                include: {
                  product: {
                    select: {
                      name: true,
                      price: true,
                      stock: true,
                      id: true,
                      image: {
                        select: {
                          url: true,
                          id: true,
                        },
                      },
                    },
                  },
                },
              },
              guestOrderInfo: true,
              user: true,
            },
          });

          return NextResponse.json(
            { message: "update Order Successfully", order: updated },
            { status: 200 },
          );
        }
        return NextResponse.json(
          { message: `This order Alraedy ${status.toLowerCase()} ` },
          { status: 400 },
        );
      }
      return NextResponse.json(
        { message: "This order not found" },
        { status: 400 },
      );
    }
    return NextResponse.json({ message: "Invalid Inputs" }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error , Check Your Connection", error },
      { status: 500 },
    );
  }
}

/**
 * @method DELETE
 * @route /api/category/:id
 * @description Admin and product Delete  Category
 * @access private
 */
async function deleteOrder(req: NextRequest) {
  const url = new URL(req.url);
  const orderId = url.pathname.split("/").pop();

  try {
    // get user body
    // check if found body
    // get user to update data and check if founded in db
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (order) {
      if (order.guestInfo) {
        await prisma.guestOrderInfo.delete({
          where: {
            orederid: order.id,
          },
        });
      }
      await prisma.orderItem.deleteMany({
        where: {
          orderId: order.id,
        },
      });
      await prisma.order.delete({
        where: {
          id: orderId,
        },
      });
      return NextResponse.json(
        { message: "Delete order Successfully" },
        { status: 200 },
      );
    }
    return NextResponse.json(
      { message: "This order not found" },
      { status: 400 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error , Check Your Connection", error },
      { status: 500 },
    );
  }
}
/**
 * @method GET
 * @route /api/category/:id
 * @description Admin and product Get Single  Category
 * @access private
 */
async function getorder(req: NextRequest) {
  const url = new URL(req.url);
  const orderId = url.pathname.split("/").pop();
  try {
    // get user body
    // check if found body
    // get user to update data and check if founded in db
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        orderItems: {
          include: {
            product: {
              include: {
                image: {
                  select: {
                    url: true,
                    id: true,
                  },
                },
              },
            },
          },
        },
        guestOrderInfo: true,
        user: true,
      },
    });

    // check if user exist
    if (order) {
      return NextResponse.json(order, { status: 200 });
    }
    return NextResponse.json(
      { message: "This category not found" },
      { status: 400 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error , Check Your Connection", error },
      { status: 500 },
    );
  }
}
export const PUT = requireAdminOrder(updateOrder);
export const DELETE = requireAdminOrder(deleteOrder);
export const GET = requireAdminOrder(getorder);
