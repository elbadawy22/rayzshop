import { uploadCloud } from "@/app/lib/cloudActions";
import { ImagesDots, JwtPayload } from "@/app/lib/dots";
import { requireAdminProduct } from "@/app/lib/middleware";
import prisma from "@/app/lib/prismaDb";
import { NextRequest, NextResponse } from "next/server";
import { PRODUCTS_PER_PAGE } from "./actions";

/**
 * @method GET
 * @route /api/category
 * @description Admin and PRODUCTS_MANAGER Get All categories
 * @access private
 */

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const searchName = searchParams.get("search");
  const searchCategory = searchParams.get("categoryId");
  const searchMaxPrice = searchParams.get("maxPrice");
  const searchMinPrice = searchParams.get("minPrice");
  const searchPriceOrder = searchParams.get("priceOrder");
  const pageNumber = parseInt(searchParams.get("pageNumber") as string) || 1;
  const where: any = {};
  if (searchName) {
    where.name = {
      contains: searchName,
      mode: "insensitive",
    };
  }
  if (searchCategory) {
    where.categoryId = searchCategory;
  }
  if (searchMinPrice && searchMaxPrice) {
    where.price = {
      gte: parseInt(searchMinPrice),
      lte: parseInt(searchMaxPrice),
    };
  }
  if (searchMinPrice || searchMaxPrice) {
    if (searchMinPrice && !searchMaxPrice)
      where.price = { gte: parseInt(searchMinPrice) };
    if (searchMaxPrice && !searchMinPrice)
      where.price = { lte: parseInt(searchMaxPrice) };
  }
  try {
    const countProduct = await prisma.product.count({
      where,
    });
    const product = await prisma.product.findMany({
      skip: pageNumber * PRODUCTS_PER_PAGE - PRODUCTS_PER_PAGE,
      take: PRODUCTS_PER_PAGE,
      where,
      include: {
        category: true,
        image: {
          select: {
            id: true,
            url: true,
          },
        },
        createdBy:true
      },
      orderBy: searchPriceOrder
        ? { price: searchPriceOrder == "asc" ? "asc" : "desc" }
        : { createdAt: "desc" },
    });
    return NextResponse.json(
      {
        data: product,
        count: countProduct,
        page: pageNumber,
        countPagn: PRODUCTS_PER_PAGE,
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

async function createProduct(req: NextRequest, user: JwtPayload) {
  try {
    const data = await req.formData();

    if (data) {
      const name = data.get("name") as string;
      const description = data.get("description") as string;
      const stock = data.get("stock") as string;
      const price = data.get("price") as string;
      const categoryId = data.get("categoryId") as string;
      const file = await data.getAll("image");

      if (name && description && stock && price && categoryId) {
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
          const priseInt = parseFloat(price);
          const stockInt = parseInt(stock);
          const product = await prisma.product.create({
            data: {
              name: name,
              price: priseInt,
              stock: stockInt,
              categoryId: categoryId,
              description: description || "",
              createdById: user.id,
            },
          });
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

          // if (imageUpload.url) {
          //   return NextResponse.json(
          //     { message: "faild to upload Images" },
          //     { status: 400 },
          //   );
          // }

          return NextResponse.json(
            { message: "Create Product Successfully" },
            { status: 200 },
          );
        }

        return NextResponse.json(
          { message: "Requierd Images" },
          { status: 400 },
        );
      }

      return NextResponse.json({ message: "Invalid Inputs" }, { status: 400 });
    }
    return NextResponse.json({ message: "Invalid Inputs" }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error, Check Your Connection", error },
      { status: 500 },
    );
  }
}
export const POST = requireAdminProduct(createProduct);
