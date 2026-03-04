import { UserRegisterDto } from "@/app/lib/dots";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/app/lib/prismaDb";
/**
 * @method POST
 * @route /api/auth/login
 * @description User Register A New Account
 * @access puplic
 */
export async function POST(req: NextRequest) {
  try {
    // get body from user
    const body = (await req.json()) as UserRegisterDto;
    // check if found body
    if (body) {
      // if found body Check if email exist
      const emailCheck = await prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });
      //   if email exist return error
      if (emailCheck) {
        return NextResponse.json(
          {
            message: "This Email Already Exist",
          },
          { status: 400 },
        );
      }
      // hash password
      const salt = bcrypt.genSaltSync(10);
      const passwordHash = bcrypt.hashSync(body.password, salt);
      // check all inputs type is string
      if (
        typeof body.email === "string" &&
        typeof body.password === "string" &&
        typeof body.name === "string" &&
        typeof body.phone === "string"
      ) {
        // if all valid create user
        const ifNoData = await prisma.user.count();
        if (ifNoData === 0) {
          await prisma.user.create({
            data: {
              name: body.name,
              email: body.email,
              password: passwordHash,
              phone: body.phone,
              role:"ADMIN"
            },
          });
        } else {
          await prisma.user.create({
            data: {
              name: body.name,
              email: body.email,
              password: passwordHash,
              phone: body.phone,
            },
          });
        }
        // return sccess message
        return NextResponse.json(
          {
            message: "Register Successfully , Login Now",
          },
          { status: 200 },
        );
      }
    }
    // if not found body return error
    return NextResponse.json(
      {
        message: "Invalid Inputs",
      },
      { status: 400 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error , Check Your Connection", error },
      { status: 500 },
    );
  }
}
