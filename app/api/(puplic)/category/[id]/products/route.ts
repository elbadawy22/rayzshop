import prisma from "@/app/lib/prismaDb";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method GET
 * @route /api/category/:id/product
 * @description Admin and product Get Single  Category
 * @access private
 */

interface Params {
  params: Promise<{ id: string }>;
}
export async function GET(req: NextRequest, params: Params) {
  const {id} =  await params.params
  const categoryId = id;

  try {
    // get user body
    // check if found body
    // get user to update data and check if founded in db
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
      include: {
        images: {
          select: {
            id: true,
            url: true,
          },
        },
      },
    });

    // check if user exist
    if (category) {
      const product = await prisma.product.findMany({
        where: {
          categoryId: categoryId,
        },
      });
      return NextResponse.json(product, { status: 200 });
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
