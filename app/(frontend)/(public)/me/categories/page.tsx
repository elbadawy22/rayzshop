"use client";

import ProductItem from "@/app/(frontend)/components/puplicUsed/ProductItem";
import { Categories, Products } from "@/app/(frontend)/lib/taypes";
import { useAuth } from "@/app/(frontend)/providers/AuthProvider";
import { MessageCircleWarning } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function page() {
  const { user } = useAuth();

  return (
    <>
      {user?.products ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden ">
          <div className="w-full ">
            <h1 className="font-bold text-gray-800 text-center pt-10">
              My Categories
            </h1>
          </div>
          <div className="rounded-lg  w-full py-7 gap-y-5 grid grid-cols-2 md:grid-cols-3 gap-x-1  lg:grid-cols-4 px-3 overflow-hidden bg-white">
            {user?.categories?.map((category: Categories) => (
              <Link href={`/admin/categories/${category.id}`} key={category.id}>
                <div className="w-full shadow-sm rounded-lg">
                  <div className="  flex flex-col items-center w-auto h-auto rounded-t-md overflow-hidden  ">
                    {category.images?.length > 0 ? (
                      <Image
                        className="w-50  h-auto  hover:scale-75  transition-all duration-200 overflow-hidden cursor-pointer "
                        width={250}
                        height={250}
                        src={category.images[0].url}
                        alt={category.images[0].id}
                      />
                    ) : (
                      ""
                    )}
                    <div className="text-xs px-2  w-full flex items-center justify-between  ">
                      <div className="w-full flex text-gray-500 pt-3 gap-1">
                        {" "}
                        <span>
                          {category.createdAt.split("T")[0].split("-")[2]}/
                          {category.createdAt.split("T")[0].split("-")[1]}/
                          {category.createdAt.split("T")[0].split("-")[0]}
                        </span>
                        {" @ "}
                        <span>
                          {category.createdAt.split("T")[1].slice(0, 5)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col  px-2">
                    <div className="flex items-center">
                      <h3 className="text-slate-800 text-sm md:text-md font-bold overflow-x-hidden   ">
                        {category.name.slice(0, 20)}
                        {category.name.length > 20 ? (
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
                        <span className="text-[10px]">{category.stock}</span>{" "}
                        <span>in stoke</span>
                      </span>
                      <span className="text-xs md:text-md text-blue-500 font-bold">
                        {category.createdBy?.email}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
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
