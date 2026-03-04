import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/app/lib/middleware";
import { UpdateUser } from "@/app/lib/dots";
import prisma from "@/app/lib/prismaDb";
import bcrypt from "bcryptjs";
import { Role } from "@/app/generated/prisma/enums";

/**
 * @method PUT
 * @route /api/admin/users
 * @description Admin Update in all Users Account
 * @access private
 */
async function updateUser(req: NextRequest, params: { id: string }) {
  // get id from url
  const url = new URL(req.url);
  const userId = url.pathname.split("/").pop();
  try {
    // get user body
    const body = (await req.json()) as UpdateUser;
    const { phone, name } = body;
    // check if found body
    if (body) {
      // get user to update data and check if founded in db
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      // check if user exist
      if (user) {
        // if password in body => hash password |OR| undefined
        const hashpass = body.password
          ? bcrypt.hashSync(body.password, 10)
          : undefined;

        // if role in body => handel role |OR| undefined
        const role = body.role?.toUpperCase().trim() as Role;
        // update data in db
        const updated = await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            name: name || user.name,
            phone: phone || user.phone,
            role: role || user.role,
            password: hashpass || user.password,
          },
          include: {
            products: true,
            categories: true,
            orders: true,
          },
        });
        return NextResponse.json(
          { message: "Updated User Successfuly", user: updated },
          { status: 200 },
        );
      }
      return NextResponse.json(
        { message: "This user not found" },
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
 * @route /api/admin/users
 * @description Admin Update in all Users Account
 * @access private
 */
async function deleteUser(req: NextRequest, params: { id: string }) {
  const url = new URL(req.url);
  const userId = url.pathname.split("/").pop();

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (user) {
      await prisma.user.delete({
        where: {
          id: userId,
          email: user.email,
        },
      });

      return NextResponse.json(
        { message: "Delete User Successfully" },
        { status: 200 },
      );
    }
    return NextResponse.json(
      { message: "This user not found" },
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
 * @description Admin and product Get Single  user
 * @access private
 */
async function getUser(req: NextRequest, params: { id: string }) {
  const url = new URL(req.url);
  const userId = url.pathname.split("/").pop();
  try {
    // get user body
    // check if found body
    // get user to update data and check if founded in db
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        products: true,
        orders: true,
        categories: true,
      },
    });

    // check if user exist
    if (user) {
      return NextResponse.json(user, { status: 200 });
    }
    return NextResponse.json(
      { message: "This user not found" },
      { status: 400 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error , Check Your Connection", error },
      { status: 500 },
    );
  }
}
export const GET = requireAdmin(getUser);
export const PUT = requireAdmin(updateUser);
export const DELETE = requireAdmin(deleteUser);
