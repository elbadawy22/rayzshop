import { ImagesDots, JwtPayload } from "@/app/lib/dots";
import { requireAdminProduct } from "@/app/lib/middleware";
import prisma from "@/app/lib/prismaDb";
import { NextRequest, NextResponse } from "next/server";
import { uploadCloud } from "@/app/lib/cloudActions";
import { CATEGORY_PER_PAGE } from "./actions";

/**
 * @method GET
 * @route /api/category
 * @description Admin and PRODUCTS_MANAGER Get All categories
 * @access private
 */

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search");
  const pageNumber = parseInt(searchParams.get("pageNumber") as string) || 1;

  const where: any = {};
  if (search) {
    where.name = { contains: search, mode: "insensitive" };
  }
  try {
    const countCategory = await prisma.category.count({
      where,
    });
    const category = await prisma.category.findMany({
      // skip: pageNumber * CATEGORY_PER_PAGE - CATEGORY_PER_PAGE,
      // take: CATEGORY_PER_PAGE,
      where,
      include: {
        images: {
          select: {
            id: true,
            url: true,
          },
        },
        createdBy: true,
        product:true
      },
      orderBy:{
      name:"asc"
      }
    });
    return NextResponse.json(
      {
        data: category,
        count: countCategory,
        countPagn: CATEGORY_PER_PAGE,
        page: pageNumber,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error , Check Your Connection", error },
      { status: 500 },
    );
  }
}

/**
 * @method POST
 * @route /api/category
 * @description Admin and PRODUCTS_MANAGER Create A New category
 * @access private
 */

async function createCategory(req: NextRequest, user: JwtPayload) {
  try {
    // get form data from user
    const data = await req.formData();
    // if found data
    if (data) {
      // get data and set it in variable
      const name = data.get("name") as string;
      const description = data.get("description") as string;
      const stock = data.get("stock") as string;
      const file = data.get("image") as File;
      // check if found this category name in DB
      const nameCheck = await prisma.category.findUnique({
        where: {
          name: name.trim(),
        },
      });
      // if found this category return error mesage
      if (nameCheck) {
        return NextResponse.json(
          { message: "This Category name Already exist" },
          { status: 400 },
        );
      }
      // check if found a file
      if (file) {
        // if user input > or < of 1 image return error mesage
        if (data.getAll("image").length !== 1) {
          return NextResponse.json(
            { message: "Requried only 1 image" },
            { status: 400 },
          );
        }
        // check if file is image, if not image return error mesage
        if (file.type.split("/")[0] !== "image") {
          return NextResponse.json(
            { message: "Accept only images" },
            { status: 400 },
          );
        }
      }
      // if file is OK upload this image in cloudinary and get url
      const imageUpload =
        ((await uploadCloud(file, "category").then(
          (res) => res,
        )) as ImagesDots) || null;
      // if uplouded successfully
      if (imageUpload) {
        // chenge stoke type to number
        const stockInt = parseInt(stock);
        // create this category in db and return to get this category id
        const createdata = await prisma.category.create({
          data: {
            name: name.trim(),
            description: description,
            stock: stockInt,
            createdById: user.id,
          },
        });
        // create new image in db and set category id with this image
        await prisma.images.create({
          data: {
            categoryId: createdata.id,
            public_id: imageUpload?.public_id || "",
            url: imageUpload?.url || "",
          },
        });
        return NextResponse.json(
          { message: "Create Category Successfully" },
          { status: 200 },
        );
      }
    }
    return NextResponse.json({ message: "Invalid Inputs" }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error, Check Your Connection", error },
      { status: 500 },
    );
  }
}
export const POST = requireAdminProduct(createCategory);
