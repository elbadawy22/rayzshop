import { JwtPayload, UpdateUser } from "@/app/lib/dots";
import { requireAuth } from "@/app/lib/middleware";
import prisma from "@/app/lib/prismaDb";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

async function getProfile(req: NextRequest, user: JwtPayload) {
  try {
    // in  first required Auth with Function  requireAuth(getProfile)
    // if found user
    // console.log(req);

    if (user) {
      // get user from db
      const userData = await prisma.user.findUnique({
        where: {
          email: user.email,
        },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          deliveryAddress: true,
          role: true,
          createdAt: true,
          products: {
            include: {
              image: {
                select: {
                  id: true,
                  url: true,
                },
              },
              category: {
                select: {
                  name: true,
                },
              },
            },
          },
          orders: {
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
            },
            orderBy:{
              createdAt:"desc"
            }
          },
          categories: {
            include: {
              images: {
                select: {
                  id: true,
                  url: true,
                },
              },
            },
          },
        },
      });
      // if user found in db return user
      if (userData) {
        return NextResponse.json({ user: userData }, { status: 200 });
      }
    }
    // if not found user
    return NextResponse.json(
      { message: "this user not found" },
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
 * @method PUT
 * @route /api/admin/users
 * @description Admin Update in all Users Account
 * @access private
 */
async function updateUser(req: NextRequest, user: JwtPayload) {
  // get id from url
  try {
    // get user body
    const body = (await req.json()) as UpdateUser;
    const { phone, name } = body;
    // check if found body
    if (body) {
      // get user to update data and check if founded in db
      const finduser = await prisma.user.findUnique({
        where: {
          id: user.id,
        },
      });
      // check if user exist
      if (finduser) {
        // if password in body => hash password |OR| undefined
        const hashpass = body.password
          ? bcrypt.hashSync(body.password, 10)
          : undefined;

        // if role in body => handel role |OR| undefined
        // update data in db
        const updated = await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            name: name || finduser.name,
            phone: phone || finduser.phone,
            password: hashpass || finduser.password,
          },
          include: {
            products: {
              include: {
                image: {
                  select: {
                    id: true,
                    url: true,
                  },
                },
                category: {
                  select: {
                    name: true,
                  },
                },
              },
            },
            orders: {
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
              },
            },
            categories: {
              include: {
                images: {
                  select: {
                    id: true,
                    url: true,
                  },
                },
              },
            },
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

export const GET = requireAuth(getProfile);
export const PUT = requireAuth(updateUser);
