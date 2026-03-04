"use client";

import ProductItem from "@/app/(frontend)/components/puplicUsed/ProductItem";
import { Products } from "@/app/(frontend)/lib/taypes";
import { useAuth } from "@/app/(frontend)/providers/AuthProvider";
import { MessageCircleWarning } from "lucide-react";

export default function page() {
  const { user } = useAuth();

  return (
    <>
      {user?.products  ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden ">
          <div className="w-full " ><h1 className="font-bold text-gray-800 text-center pt-10" >My Products</h1></div>
          <div className="rounded-lg  w-full py-7 gap-y-5 grid grid-cols-2 md:grid-cols-3 gap-x-1  lg:grid-cols-4 px-3 overflow-hidden bg-white">
            {user?.products?.map((product: Products) => (
              <ProductItem product={product} key={product.id} />
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full h-screen flex justify-center items-center">
          <div className="flex gap-1  justify-center items-center text-gray-700">
            <MessageCircleWarning className="w-5" />
            No Products Found..!
          </div>{" "}
        </div>
      )}
    </>
  );
}
