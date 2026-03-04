import { NextRequest, NextResponse } from "next/server";
import { requireAdminProduct } from "@/app/lib/middleware";
import { ImagesDots } from "@/app/lib/dots";
import prisma from "@/app/lib/prismaDb";
import { deleteCloud, uploadCloud } from "@/app/lib/cloudActions";

/**
 * @method PUT
 * @route /api/category/:id
 * @description Admin and product Update  Category
 * @access private
 */
async function updateCategory(req: NextRequest, params: { id: string }) {
  // get id from url
  const url = new URL(req.url);
  const categoryId = url.pathname.split("/").pop();

  try {
    const data = await req.formData();
    // check if found body
    if (data) {
      const name = data.get("name") as string;
      const description = data.get("description") as string;
      const stock = data.get("stock") as string;
      const file = data.get("image") as File;
      // get user to update data and check if founded in db
      const category = await prisma.category.findUnique({
        where: {
          id: categoryId,
        },
      });

      // check if user exist
      if (category) {
        const nameExist = name
          ? await prisma.category.findUnique({
              where: {
                name: name,
              },
            })
          : null;

        if (!nameExist) {
          // update data in db
          if (file) {
            if (data.getAll("image").length !== 1) {
              return NextResponse.json(
                { message: "Requried only 1 image" },
                { status: 400 },
              );
            }
            if (file.type.split("/")[0] !== "image") {
              return NextResponse.json(
                { message: "Accept only images" },
                { status: 400 },
              );
            }

            const getImgId = await prisma.category.findUnique({
              where: {
                id: categoryId,
              },
              include: {
                images: true,
              },
            });

            const deleteimg = await deleteCloud(
              getImgId?.images[0].public_id as string,
            );
            if (!deleteimg) {
              return NextResponse.json(
                {
                  message: "falid to delete Image",
                },
                { status: 400 },
              );
            }
            const imgId = getImgId?.images[0].id as string;
            const imageUpload =
              ((await uploadCloud(file, "category").then(
                (res) => res,
              )) as ImagesDots) || null;
            if (!imageUpload) {
              return NextResponse.json(
                { message: "Faild to upload Your image" },
                { status: 400 },
              );
            }
            await prisma.images.update({
              where: {
                id: imgId,
              },
              data: {
                public_id: imageUpload.public_id,
                url: imageUpload.url,
              },
            });
          }
          const stockInt = stock ? (parseInt(stock) as number) : null;

          const updated = await prisma.category.update({
            where: {
              id: categoryId,
            },
            data: {
              name: name || category.name,
              description: description || category.description,
              stock: stockInt || category.stock,
            },
            include: {
              createdBy: true,
              images: {
                select: {
                  id: true,
                  url: true,
                },
              },
              product: {
                include: {
                  image: {
                    select: {
                      id: true,
                      url: true,
                    },
                  },
                  createdBy: true,
                },
              },
            },
          });

          return NextResponse.json(
            { message: "update User Successfully", category: updated },
            { status: 200 },
          );
        }
        return NextResponse.json(
          { message: "This category name already Found" },
          { status: 400 },
        );
      }
      return NextResponse.json(
        { message: "This category not found" },
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
async function deleteCategory(req: NextRequest) {
  const url = new URL(req.url);
  const categoryId = url.pathname.split("/").pop();

  try {
    // get user body
    // check if found body
    // get user to update data and check if founded in db
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
      include: {
        images: true,
      },
    });

    if (category) {
      await prisma.category.delete({
        where: {
          id: categoryId,
        },
      });
      await deleteCloud(category?.images[0].public_id as string);
      await prisma.images.delete({
        where: {
          id: category.images[0].id,
        },
      });
      return NextResponse.json(
        { message: "Delete category Successfully" },
        { status: 200 },
      );
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
/**
 * @method GET
 * @route /api/category/:id
 * @description Admin and product Get Single  Category
 * @access private
 */
interface Params {
  params: Promise<{ id: string }>;
}
export async function GET(req: NextRequest, params: Params) {
  const { id } = await params.params;
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
        product: {
          include: {
            image: {
              select: {
                id: true,
                url: true,
              },
            },
            createdBy: true,
          },
        },
      },
    });

    // check if user exist
    if (category) {
      return NextResponse.json(category, { status: 200 });
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
export const PUT = requireAdminProduct(updateCategory);
export const DELETE = requireAdminProduct(deleteCategory);
