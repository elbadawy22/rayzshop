import { getProduct } from "@/app/(frontend)/lib/services/server/products.services";
import { Products } from "@/app/(frontend)/lib/taypes";
import Image from "next/image";
import AddCartBtn from "../AddCartBtn";
import ImageSwiper from "@/app/(frontend)/components/puplicUsed/ImageSwiper";

const ProductsDetails = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const products: Products =
    (await getProduct(id).then((res) => res.json())) || [];

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="  flex flex-col justify-between items-center md:flex-row w-full  p-6 max-w-300  ">
        <div className="grow flex flex-col justify-center items-center">
          <div className="max-w-100">
            <ImageSwiper images={products.image} />
          </div>
          <div className="flex justify-center items-center gap-2 opacity-50 max-w-[99%] overflow-x-scroll  ">
            {products.image.map((img, i) => (
              <Image
                src={img.url}
                alt={img.id}
                width={250}
                height={250}
                className="w-30 "
                key={img.id}
              />
            ))}
          </div>
        </div>
        <div className="  w-full md:max-w-[50%] ">
          <div>
            {" "}
            <h2>{products.name}</h2>{" "}
            <span className="text-sm text-blue-500 rounded-lg bg-blue-100 px-1 ">
              {products?.category?.name}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 pt-7">
            <span className="font-bold text-blue-500 ">
              ${products.price.toLocaleString()}
            </span>
            <span className="text-xs text-red-800">
              {products.stock} in stock
            </span>
          </div>
          <div className="  flex w-full rounded-md overflow-hidden justify-center items-center my-5">
            <AddCartBtn product={products} />
          </div>
        </div>
      </div>
      <div className="w-full max-w-300 py-10 px-5">
        <div className="border border-gray-300 rounded px-3  font-bold w-full max-w-[99%]">
          <h3 className="border-b-2 border-gray-300 p-2 px-3 font-bold">
            Specifications:
          </h3>
          <pre className="p-2 px-5 text-sm overflow-x-scroll ">
            {products.description}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ProductsDetails;
