import { serialize } from "cookie";
import { JwtPayload } from "./dots";
import jwt from "jsonwebtoken";

export function generateToken(jwtPayload: JwtPayload) {
  const toke = jwt.sign(jwtPayload, process.env.JWT_SECRETKEY as string, {
    expiresIn: "30d",
  });

  return toke;
}

export function setCookie(jwtPayload: JwtPayload) {
  const token = generateToken(jwtPayload);
  const cookie = serialize("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax", // strict
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return cookie;
}

