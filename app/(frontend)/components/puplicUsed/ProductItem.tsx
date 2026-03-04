import { Products } from "../../lib/taypes";
import Image from "next/image";
import Link from "next/link";

const ProductItem = ({ product }: { product: Products }) => {
  return (
    <Link href={`/admin/products/${product.id}`} key={product.id}>
      <div className="w-full shadow-sm rounded-lg">
        <div className="  flex flex-col items-center w-auto h-auto rounded-t-md overflow-hidden  ">
          {product.image?.length > 0 ? (
            <Image
              className="w-50  h-auto  hover:scale-75  transition-all duration-200 overflow-hidden cursor-pointer "
              width={250}
              height={250}
              src={product.image[0].url}
              alt={product.image[0].id}
            />
          ) : (
            ""
          )}
          <div className="text-xs px-2  w-full flex items-center justify-between  ">
            <div className="w-full flex text-gray-500 pt-3 gap-1">
              {" "}
              <span>
                {product.createdAt.split("T")[0].split("-")[2]}/
                {product.createdAt.split("T")[0].split("-")[1]}/
                {product.createdAt.split("T")[0].split("-")[0]}
              </span>
              {" @ "}
              <span>{product.createdAt.split("T")[1].slice(0, 5)}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col  px-2">
          <div className="flex items-center">
            <h3 className="text-slate-800 text-sm md:text-md font-bold overflow-x-hidden   ">
              {product.name.slice(0, 20)}
              {product.name.length > 20 ? (
                <span className="text-xs font-normal text-gray-300">
                  ....more
                </span>
              ) : (
                ""
              )}
            </h3>
          </div>
          <div className="flex items-end">
            <h3 className="text-slate-500 pl-3 text-sm md:text-md font-bold overflow-x-hidden   "></h3>
          </div>

          <div className="pb-1  flex flex-col ">
            <span className="text-red-700 text-[8px] flex gap-1 items-center ">
              <span className="text-[10px]">{product.stock}</span>{" "}
              <span>in stoke</span>
            </span>
            <span className="text-xs md:text-md text-blue-500 font-bold">
              {product.createdBy?.email}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
