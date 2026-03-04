import { NextRequest, NextResponse } from "next/server";
import { JwtPayload } from "./dots";
import jwt from "jsonwebtoken";

export function getCookie(request: NextRequest , name: string): string | undefined {
  if (!request.headers.get("cookies")) {    
    return request.cookies.get(name)?.value
  }
  const cookieHeader = request.headers?.get('cookies') || ''
  const cookies = Object.fromEntries(
    cookieHeader.split('; ').map(cookie => {
      const [key, ...val] = cookie.split('=')
      return [key, val.join('=')]
    })
  )  
  return cookies[name]
}

export const verifyToken = (
  req: NextRequest,
): JwtPayload | null | NextResponse => {
  try {
    const token = getCookie(req,"token");
    // console.log(token);
    
    if (!token) {
      return null;
    }
    const jwtKey = process.env.JWT_SECRETKEY as string;
    const verifyDecoded = jwt.verify(
      token,
      process.env.JWT_SECRETKEY as string,
    ) as JwtPayload;
    return verifyDecoded;
  } catch (error) {
    return NextResponse.json(
      { message: "verification Faild" },
      { status: 401 },
    );
  }
};

export function requireAuth(
  handleReq: (req: NextRequest, user: JwtPayload) => Promise<NextResponse>,
) {
  return async (req: NextRequest) => {
    const userToken = verifyToken(req) as JwtPayload;    
    if (!userToken) {

      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    return handleReq(req, userToken);
  };
}
export function requireAdmin(
  handleReq: (req: NextRequest, user: JwtPayload) => Promise<NextResponse>,
) {
  return async (req: NextRequest) => {
    // console.log(req.cookies.get("token"));

    const userToken = verifyToken(req) as JwtPayload;
    if (userToken?.role.toLowerCase() === "admin") {
      return handleReq(req, userToken);
    }
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  };
}
export function requireAdminProduct(
  handleReq: (req: NextRequest, user: JwtPayload) => Promise<NextResponse>,
) {
  return async (req: NextRequest) => {
    const userToken = verifyToken(req) as JwtPayload;
    if (
      userToken?.role.toLowerCase() === "admin".toLowerCase() ||
      userToken?.role.toLowerCase() === "PRODUCTS_MANAGER".toLowerCase()
    ) {
      return handleReq(req, userToken);
    }
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  };
}

export function requireAdminOrder(
  handleReq: (req: NextRequest, user: JwtPayload) => Promise<NextResponse>,
) {
  return async (req: NextRequest) => {
    const userToken = verifyToken(req) as JwtPayload;
    if (
      userToken?.role.toLowerCase() === "admin".toLowerCase() ||
      userToken?.role.toLowerCase() === "ORDER_MANAGER".toLowerCase()
    ) {
      return handleReq(req, userToken);
    }
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  };
}

