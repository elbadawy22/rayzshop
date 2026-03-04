import { CreateOrder, JwtPayload } from "@/app/lib/dots";
import { requireAdminOrder, verifyToken } from "@/app/lib/middleware";
import prisma from "@/app/lib/prismaDb";
import { NextRequest, NextResponse } from "next/server";
import { ORDER_PER_PAGE } from "./actions";

/**
 * @method GET
 * @route /api/category
 * @description Admin and PRODUCTS_MANAGER Get All categories
 * @access private
 */

async function getOrders(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const phone = searchParams.get("phone") as string;
  const users = searchParams.get("users") as string;
  const pageNumber = parseInt(searchParams.get("pageNumber") as string) || 1;
  const PENDING = await prisma.order.count({
    where: {
      status: {
        equals: "PENDING",
      },
    },
  });
  const CONFIRMED = await prisma.order.count({
    where: {
      status: {
        equals: "CONFIRMED",
      },
    },
  });
  const DELIVERED = await prisma.order.count({
    where: {
      status: {
        equals: "DELIVERED",
      },
    },
  });
  const CANCELED = await prisma.order.count({
    where: {
      status: {
        equals: "CANCELED",
      },
    },
  });
  const where: any = {};
  if (status) {
    where.status = { equals: status.toUpperCase() };
  }
  if (phone) {
    if (users === "true") {
      where.user = { phone: { contains: phone } };
    } else {
      where.guestOrderInfo = { phone: { contains: phone } };
    }
  }
  try {
    const countOrder = await prisma.order.count({
      where,
    });
    const order = await prisma.order.findMany({
      skip: pageNumber * ORDER_PER_PAGE - ORDER_PER_PAGE,
      take: ORDER_PER_PAGE,
      where,
      include: {
        user: true,
        guestOrderInfo: true,
      },
    });
    return NextResponse.json(
      {
        data: order,
        count: countOrder,
        countPagn: ORDER_PER_PAGE,
        page: pageNumber,
        charts: {
          PENDING,
          CONFIRMED,
          DELIVERED,
          CANCELED,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error , Check Your Connection", error },
      { status: 500 },
    );
  }
}

/**
 * @method POST
 * @route /api/category
 * @description Admin and PRODUCTS_MANAGER Create A New category
 * @access private
 */

export async function POST(req: NextRequest) {
  try {
    // get form data from user
    const body = (await req.json()) as CreateOrder;
    // if found data
    if (body) {
      const user = verifyToken(req) as JwtPayload;
      if (user?.role.toUpperCase() === "CUSTTOMER") {
        if (body.deliveryAddress && typeof body.deliveryAddress === "string") {
          if (body.orderItems?.length > 0) {
            const validData = body.orderItems?.map((productItem) => {
              if (typeof productItem?.id !== "string") {
                return { message: "Items Not found ", status: 400 };
              }
              const asyncFnValidItem = async () => {
                const stockExist: any = await prisma.product.findUnique({
                  where: {
                    id: productItem?.id as string,
                  },
                });
                if (!stockExist) {
                  return { message: "Items Not found", status: 400 };
                }
                if (+productItem.quantity <= 0) {
                  return {
                    message: "Invalid quantity",
                    status: 400,
                  };
                }
                if (parseInt(stockExist?.stock) <= +productItem.quantity) {
                  return {
                    message: "Sorry, Find Item Out of Stock ,Try again",
                    status: 400,
                  };
                }
                return {
                  message: "",
                  status: 200,
                };
              };

              return asyncFnValidItem().then((res) => res);
            });
            const respon = await Promise.all(validData);
            if (respon[0].status !== 200) {
              return NextResponse.json(
                { message: respon[0].message },
                { status: 400 },
              );
            }
            const createOrder = await prisma.order.create({
              data: {
                deliveryAddress: body.deliveryAddress,
                userId: user.id,
                orderItems: {
                  create: body.orderItems.map((product) => ({
                    productId: product.id as string,
                    quantity: product.quantity,
                  })),
                },
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
                      },
                    },
                  },
                },
              },
            });
            const updateIdPrice = await prisma.order.update({
              where: {
                id: createOrder.id,
              },
              data: {
                totalPrice: createOrder.orderItems.reduce(
                  (pre, curr) => pre + curr.product.price,
                  0,
                ),
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
              },
            });
            return NextResponse.json(
              { message: "Order Created Successfully ", order: updateIdPrice },
              { status: 200 },
            );
          }
          return NextResponse.json(
            { message: "Order items not found " },
            { status: 400 },
          );
        }
        return NextResponse.json(
          { message: "Your Addrress is Requierd " },
          { status: 400 },
        );

        // if no user create with guest user
      } else {
        if (typeof body.name === "string") {
          if (body.phone && typeof body.phone === "string" && +body.phone) {
            if (
              body.deliveryAddress &&
              typeof body.deliveryAddress === "string"
            ) {
              if (body.orderItems?.length > 0) {
                const validData = body.orderItems?.map((productItem) => {
                  if (typeof productItem?.id !== "string") {
                    return { message: "Items Not found ", status: 400 };
                  }
                  const asyncFnValidItem = async () => {
                    const stockExist: any = await prisma.product.findUnique({
                      where: {
                        id: productItem?.id as string,
                      },
                    });
                    if (!stockExist) {
                      return { message: "Items Not found", status: 400 };
                    }
                    if (+productItem.quantity <= 0) {
                      return {
                        message: "Invalid quantity",
                        status: 400,
                      };
                    }
                    if (parseInt(stockExist?.stock) <= +productItem.quantity) {
                      return {
                        message: "Sorry, Find Item Out of Stock ,Try again",
                        status: 400,
                      };
                    }
                    return {
                      message: "",
                      status: 200,
                    };
                  };

                  return asyncFnValidItem().then((res) => res);
                });
                const respon = await Promise.all(validData);
                if (respon[0].status !== 200) {
                  return NextResponse.json(
                    { message: respon[0].message },
                    { status: 400 },
                  );
                }
                const createOrder = await prisma.order.create({
                  data: {
                    deliveryAddress: body.deliveryAddress,
                    orderItems: {
                      create: body.orderItems.map((product) => ({
                        productId: product.id as string,
                        quantity: product.quantity,
                      })),
                    },
                    guestOrderInfo: {
                      create: {
                        name: body.name,
                        phone: body.phone,
                        deliveryAddress: body.deliveryAddress,
                      },
                    },
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
                          },
                        },
                      },
                    },
                    guestOrderInfo: true,
                  },
                });
                const updateIdGuest = await prisma.order.update({
                  where: {
                    id: createOrder.id,
                  },
                  data: {
                    guestInfo: createOrder?.guestOrderInfo?.id as string,
                    totalPrice: createOrder.orderItems.reduce(
                      (pre, curr) => pre + curr.product.price,
                      0,
                    ),
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
                  },
                });
                return NextResponse.json(
                  { message: "Order Created Successfully ", order: updateIdGuest },
                  { status: 200 },
                );
              }
              return NextResponse.json(
                { message: "Order items not found " },
                { status: 400 },
              );
            }
            return NextResponse.json(
              { message: "Your Addrress is Requierd " },
              { status: 400 },
            );
          }
          return NextResponse.json(
            { message: "Your Phone is Requierd " },
            { status: 400 },
          );
        }
        return NextResponse.json(
          { message: "Your Name is Requierd " },
          { status: 400 },
        );
      }
    }
    return NextResponse.json({ message: "Invalid Inputs" }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error, Check Your Connection", error },
      { status: 500 },
    );
  }
}

export const GET = requireAdminOrder(getOrders);
