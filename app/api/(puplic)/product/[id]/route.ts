import { NextRequest, NextResponse } from "next/server";
import { requireAdminProduct } from "@/app/lib/middleware";
import { ImagesDots, JwtPayload, UpdateProduct } from "@/app/lib/dots";
import prisma from "@/app/lib/prismaDb";
import { uploadCloud } from "@/app/lib/cloudActions";

/**
 * @method PUT
 * @route /api/category/:id
 * @description Admin and product Update  Category
 * @access private
 */
async function updateProduct(req: NextRequest, user: JwtPayload) {
  // get id from url
  const url = new URL(req.url);
  const productId = url.pathname.split("/").pop();

  try {
    // get user body
    const data = await req.formData();
    const name = data.get("name") as string;
    const description = data.get("description") as string;
    const stock = data.get("stock") as string;
    const price = data.get("price") as string;
    const categoryId = data.get("categoryId") as string;
    const file = await data.getAll("image");
    if (data) {
      const product = await prisma.product.findUnique({
        where: {
          id: productId,
        },
      });

      if (product) {
        const priseInt = price ? parseFloat(price) : null;
        const stockInt = stock ? parseInt(stock) : null;
        const updated = await prisma.product.update({
          where: {
            id: productId,
          },
          data: {
            name: name || product.name,
            description: description || product.description,
            stock: stockInt || product.stock,
            price: priseInt || product.price,
            categoryId: categoryId || product.categoryId,
          },
          include: {
            category: true,
            image: {
              select: {
                id: true,
                url: true,
              },
            },
            createdBy: true,
          },
        });
        if (file) {
          const hasInvalidFile = file.some((item) => {
            if (!(item instanceof File)) return true;
            return item.type.split("/")[0] !== "image";
          });
          if (hasInvalidFile) {
            return NextResponse.json(
              { message: "Some files are not valid images" },
              { status: 400 },
            );
          }
          if (!hasInvalidFile) {
            file.forEach(async (item) => {
              if (!(item instanceof File)) return true;
              await uploadCloud(item, "product").then(async (res) => {
                const imgRes = res as ImagesDots;
                await prisma.images.create({
                  data: {
                    public_id: imgRes?.public_id,
                    url: imgRes?.url,
                    productId: product.id,
                  },
                });
              });
            });
          }

          // if (imageUpload.url) {
          //   return NextResponse.json(
          //     { message: "faild to upload Images" },
          //     { status: 400 },
          //   );
          // }

          return NextResponse.json(
            { message: "Update Product Successfully", data: updated },
            { status: 200 },
          );
        }

        return NextResponse.json(
          { message: "update product Successfully", data: updated },
          { status: 200 },
        );
      }
      return NextResponse.json(
        { message: "This product not found" },
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
 * @route /api/category/:id
 * @description Admin and product Delete  Category
 * @access private
 */
async function deleteProduct(req: NextRequest) {
  const url = new URL(req.url);
  const productId = url.pathname.split("/").pop();
  try {
    // get user body
    // check if found body
    // get user to update data and check if founded in db
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        category: true,
      },
    });

    // check if user exist
    if (product) {
      // update data in db
      await prisma.product.delete({
        where: {
          id: productId,
        },
      });
      return NextResponse.json(
        { message: "Delete product Successfully" },
        { status: 200 },
      );
    }
    return NextResponse.json(
      { message: "This product not found" },
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
 * @description Admin and product Get Single  Category
 * @access private
 */
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const productId = url.pathname.split("/").pop();
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        category: true,
        image: {
          select: {
            id: true,
            url: true,
          },
        },
      },
    });

    // check if user exist
    if (product) {
      return NextResponse.json(product, { status: 200 });
    }
    return NextResponse.json(
      { message: "This product not found" },
      { status: 400 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error , Check Your Connection", error },
      { status: 500 },
    );
  }
}
export const PUT = requireAdminProduct(updateProduct);
export const DELETE = requireAdminProduct(deleteProduct);
