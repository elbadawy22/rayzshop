import { deleteCloud } from "@/app/lib/cloudActions";
import { requireAdminProduct } from "@/app/lib/middleware";
import prisma from "@/app/lib/prismaDb";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method DELETE
 * @route /api/product/image/:id
 * @description Admin and product Delete  Category
 * @access private
 */
async function deleteImage(req: NextRequest) {
  const url = new URL(req.url);
  const imageId = url.pathname.split("/").pop();
  console.log(imageId);

  try {
    const image = await prisma.images.findUnique({
      where: {
        id: imageId,
      },
    });

    // check if user exist
    if (image && image.productId) {
      // update data in db
      await deleteCloud(image.public_id as string);
      await prisma.images.delete({
        where: {
          id: imageId,
        },
      });

      return NextResponse.json(
        { message: "Delete Image Successfully" },
        { status: 200 },
      );
    }
    return NextResponse.json(
      { message: "This Image not found" },
      { status: 400 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error , Check Your Connection", error },
      { status: 500 },
    );
  }
}

export const DELETE = requireAdminProduct(deleteImage);
