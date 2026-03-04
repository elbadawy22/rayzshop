import { NextRequest, NextResponse } from "next/server";
import { UserLoginDto } from "@/app/lib/dots";
import bcrypt from "bcryptjs";
import prisma from "@/app/lib/prismaDb";
import { setCookie } from "@/app/lib/generatToken";
/**
 * @method POST
 * @route  /api/auth/login
 * @desc User Login his account
 * @access puplic
 */

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as UserLoginDto;
    if (body) {
      if (typeof body.email === "string" && typeof body.password === "string") {
        const user = await prisma.user.findUnique({
          where: {
            email: body.email,
          },
        });

        if (user) {
          const checkPass = bcrypt.compareSync(body.password, user.password);
          if (checkPass) {
            const cookie = setCookie({
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            });
            return NextResponse.json(
              {
                message: "Login Successfully ",
              },
              {
                status: 200,
                headers: {
                  "Set-Cookie": cookie,
                },
              },
            );
          }
          return NextResponse.json(
            {
              message: "Invalid email or password",
            },
            { status: 400 },
          );
        }
        return NextResponse.json(
          {
            message: "Invalid email or password ",
          },
          { status: 400 },
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
