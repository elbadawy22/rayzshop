import { NextResponse } from "next/server";
import { serialize } from "cookie";

/**
 * @method POST
 * @route  /api/auth/logout
 * @desc User logout
 * @access public
 */
export async function POST() {
  try {
    const cookie = serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0, // Expire immediately
    });

    const response = NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );
    response.headers.set("Set-Cookie", cookie);
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Error logging out", error },
      { status: 500 }
    );
  }
}
