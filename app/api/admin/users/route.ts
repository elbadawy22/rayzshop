import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/app/lib/middleware";
import { CreateUser } from "@/app/lib/dots";
import prisma from "@/app/lib/prismaDb";
import bcrypt from "bcryptjs";
import { Role } from "@/app/generated/prisma/enums";
import { USER_PER_PAGE } from "./actions";

/**
 * @method GET
 * @route /api/admin/users
 * @description Admin Get All users
 * @access private
 */

async function getUsers(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const searchName = searchParams.get("search")?.toString();
  const searchPhone = searchParams.get("phone")?.toString();
  const searchRole = searchParams.get("role")?.toString();
  const pageNumber = parseInt(searchParams.get("pageNumber") as string) || 1;

  const where: any = {};
  if (searchName) {
    where.name = {
      contains: searchName,
      mode: "insensitive",
    };
  }
  if (searchPhone) {
    where.phone = {
      contains: searchPhone,
    };
  }
  if (searchRole) {
    where.role = {
      equals: searchRole,
    };
  }
  try {
    const allUsers = await prisma.user.count();
    const allGuests = await prisma.guestOrderInfo.count();
    const customers = await prisma.user.count({
      where: {
        role: {
          equals: "CUSTTOMER",
        },
      },
    });
    const admins = await prisma.user.count({
      where: {
        role: {
          equals: "ADMIN",
        },
      },
    });
    const productsManager = await prisma.user.count({
      where: {
        role: {
          equals: "PRODUCTS_MANAGER",
        },
      },
    });
    const ordersManager = await prisma.user.count({
      where: {
        role: {
          equals: "ORDER_MANAGER",
        },
      },
    });
    const count = await prisma.user.count({ where });
    const users = await prisma.user.findMany({
      skip: pageNumber * USER_PER_PAGE - USER_PER_PAGE,
      take: USER_PER_PAGE,
      where,
      orderBy: {
        role: "desc",
      },
    });
    return NextResponse.json(
      {
        users: users,
        count: count,
        countPagn: USER_PER_PAGE,
        page: pageNumber,
        chart: {
          totalUsers: allUsers,
          guests: allGuests,
          customers: customers,
          admins: admins,
          productsMang: productsManager,
          ordersMang: ordersManager,
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
 * @route /api/admin/users
 * @description Admin Create A New Account
 * @access private
 */

async function createUser(req: NextRequest) {
  try {
    // get user body
    const body = (await req.json()) as CreateUser;
    // check if body found
    if (body) {
      // check if email already exist return error
      const emailCheck = await prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });
      // if email not found create user
      if (!emailCheck) {
        // hash password befour create user
        const passHash = bcrypt.hashSync(body.password, 10);
        // handel role input befour create user
        const role = body.role.toUpperCase().trim() as Role;
        // create user in db
        if (
          role === "ADMIN" ||
          role === "ORDER_MANAGER" ||
          role === "PRODUCTS_MANAGER"
        ) {
          await prisma.user.create({
            data: {
              name: body.name,
              email: body.email,
              password: passHash,
              phone: body.phone,
              role: role,
            },
          });
          return NextResponse.json(
            { message: "Create User Successfully" },
            { status: 200 },
          );
        }
        return NextResponse.json({ message: "Invalid Roles" }, { status: 400 });
      }
      return NextResponse.json(
        { message: "This email Already exist" },
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

export const POST = requireAdmin(createUser);
export const GET = requireAdmin(getUsers);
