import { Categories, Products } from "../../lib/taypes";
import Link from "next/link";
import AddCartBtn from "../../(public)/products/AddCartBtn";
import ImageSwiper from "./ImageSwiper";
interface AllProducts extends Products {
  category: Categories;
  image: [
    {
      id: string;
      url: string;
    },
  ];
}
const ProductsList = ({
  products,
}: {
  products: { data: AllProducts[]; count: number };
}) => {
  return (
    <div className="w-full grow">
      <div className="  w-full  grid grid-cols-2 md:grid-cols-3 gap-x-1 gap-y-3 lg:grid-cols-4 px-3 overflow-hidden bg-white ">
        {products?.data.length > 0
          ? products?.data?.map((res: AllProducts) => (
              <div
                key={res.id}
                className="  flex flex-col  max-w-100 overflow-hidden   shadow  rounded-md transition-all duration-200  "
              >
                <Link
                  href={`products/${res.id}`}
                  className="  flex flex-col items-center w-auto h-auto rounded-t-md overflow-hidden  "
                >
                  {res.image.length > 0 ? (
                    <ImageSwiper images={res.image} />
                  ) : (
                    ""
                  )}
                  <span className="text-xs px-2  w-full  ">
                    <span className="bg-blue-100 text-blue-500 p-1  w-full  rounded-lg ">
                      {res.category?.name}
                    </span>
                  </span>
                </Link>
                <div className="flex flex-col  px-2">
                  <div className="flex items-center">
                    <h3 className="text-slate-800 text-sm md:text-md font-bold overflow-x-hidden   ">
                      {res.name?.slice(0, 15)}
                    </h3>
                    <span className="text-gray-400 text-xs ">.....</span>
                  </div>
                  <div className="pb-1 flex justify-between items-center">
                    <span className="text-sm md:text-md text-blue-500 font-bold">
                      ${res.price.toLocaleString()}
                    </span>
                    <span className="text-red-700 text-[8px] flex gap-1 justify-center items-center ">
                      <span className="text-[10px]">{res.stock}</span>{" "}
                      <span>in stoke</span>
                    </span>
                  </div>
                </div>
                <div className="flex w-full justify-center items-center  ">
                  <AddCartBtn product={res} />
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

export default ProductsList;
