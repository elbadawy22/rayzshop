"use client";
import { useEffect, useState } from "react";
import { Eye, ShoppingBag, Search } from "lucide-react";
import Link from "next/link";
import { Categories, UsersDots } from "../../lib/taypes";
import { getCategories } from "../../lib/services/client/categories.services";
import Loader from "../../components/loader/Loader";
import Image from "next/image";

export default function CategoryManagementPage() {
  const [filteredCategory, setFilteredCategory] = useState<Categories[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [count, setCount] = useState<number>(0);
  const [pageNumData, setPageNumData] = useState<number>(0);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (searchQuery == "") setLoading(true);
    getCategories(searchQuery, pageNum)
      .then((res) => res.json())
      .then((res) => {
        setFilteredCategory(res.data);
        setCount(res.count);
        setPageNum(res.page);
        setPageNumData(res.countPagn);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err?.message);
        setLoading(false);
      });
  }, [searchQuery, pageNum]);

  return (
    <div className="p-6  bg-g h-screen  ">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 ">
          <Link
            href="categories/create"
            className="max-w-50 bg-blue-500 hover:bg-blue-600 rounded flex justify-center items-center  "
          >
            <span className="pl-2 md:py-0 py-2 w-full text-sm text-gray-50">
              Add New Category
            </span>
            <div className="px-2 md:pr-1">
              <ShoppingBag className="  transform   w-5 text-gray-50" />
            </div>
          </Link>
          <div className=" flex-1">
            <div className=" flex  items-center    ">
              <div className="shadow bg-blue-500 border border-gray-300 rounded-l-lg  pl-2  p-1 ">
                <Search className="   transform   w-5 text-gray-50" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPageNum(1);
                }}
                placeholder="Search by Name..."
                className=" shadow border-l border-l-white border  pr-4 p-1 border-gray-300 rounded-r-lg w-full  focus:outline-none focus:ring  focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden ">
        <div className="rounded-lg  w-full py-7 gap-y-5 grid grid-cols-2 md:grid-cols-3 gap-x-1  lg:grid-cols-4 px-3 overflow-hidden bg-white">
          {filteredCategory?.map((category) => (
            <Link href={`categories/${category.id}`} key={category.id}>
              <div className="w-full shadow-sm rounded-lg">
                <div
                  className="  flex flex-col items-center w-auto h-auto rounded-t-md overflow-hidden  "
                >
                  {category.images.length > 0 ? (
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
                      {category.name}
                    </h3>
                  </div>
                  <div className="flex items-end">
                    <h3 className="text-slate-500 pl-3 text-sm md:text-md font-bold overflow-x-hidden   ">
                      {category.description?.slice(0, 20)}{" "}
                      {category?.description?.length > 20 ? (
                        <span className="text-gray-400 text-xs ">.......</span>
                      ) : (
                        ""
                      )}
                    </h3>
                  </div>

                  <div className="pb-1  flex flex-col ">
                    <span className="text-red-700 text-[12px] flex gap-1 items-center ">
                      <span className="">
                        {category.product.length.toLocaleString()}
                      </span>{" "}
                      <span>Product</span>
                    </span>
                    <span className="text-xs md:text-md text-blue-500 font-bold">
                      {category.createdBy.email}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
          {/* <p className="text-sm text-gray-600">
          </p> */}

          <div className="flex ">
            {/* <button
              hidden={pageNum <= 1}
              className="px-3  py-1 cursor-pointer border border-gray-300 rounded hover:bg-gray-50"
              onClick={(e) => setPageNum(pageNum - 1)}
            >
              Previous...
            </button> */}
            {/* {Array.from({ length: Math.ceil(count / pageNumData) })?.map(
              (_, i) => (
                <div key={i}>
                  {i + 1 <= pageNum + 1 && i + 1 >= pageNum - 1 ? (
                    <button
                      value={i + 1}
                      className={`px-3 mx-1 py-1 ${pageNum == i + 1 ? "bg-blue-600 text-white" : "border border-gray-300 rounded hover:bg-gray-50"} cursor-pointer   rounded`}
                      onClick={() => {
                        setPageNum(i + 1);
                      }}
                    >
                      {i + 1}
                    </button>
                  ) : null}
                </div>
              ),
            )} */}
            
            {/* <button
              hidden={
                pageNum >= parseInt(Math.ceil(count / pageNumData).toString())
              }
              className="px-3 cursor-pointer py-1 border border-gray-300 rounded hover:bg-gray-50"
              onClick={(e) => setPageNum(pageNum + 1)}
            >
              ...Next
            </button> */}
          </div>
        </div>
      </div>

      {loading ? <Loader /> : ""}

      <div className="mt-15 w-full h-5"></div>
    </div>
  );
}
