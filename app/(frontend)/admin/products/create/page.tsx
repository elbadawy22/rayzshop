"use client";
import Loader from "@/app/(frontend)/components/loader/Loader";
import { createNewProduct } from "@/app/(frontend)/lib/services/client/products.services";
import { Categories } from "@/app/(frontend)/lib/taypes";
import { useAuth } from "@/app/(frontend)/providers/AuthProvider";
import { ImageDownIcon, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const CreateProduct = () => {
  const router = useRouter();
  const [fileUploaded, setFileUploaded] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const {category} = useAuth() 

  const handelAction = async (e: FormData) => {
      const creater = await createNewProduct(e);
      if (creater.ok) {
        const success = await creater.json();
        toast.success(success.message);
        router.push("/admin/categories");
      }
      if (!creater.ok) {
        const fail = await creater.json();
        toast.error(fail.message);
      }
      setFileUploaded("");
    setLoading(false);
  };
  return (
    <section className="p-5 ">
      <div className="  flex justify-center ">
        <div className="border-b border-b-gray-300 px-3 max-w-230 w-full shadow rounded-lg pt-5 pb-12">
          <h2 className="text-base/7 font-semibold flex items-center gap-1  ">
            <ShoppingBag />
            Create A New Product
          </h2>
          <form
            action={handelAction}
            //  onSubmit={()=> setLoading(true)}
            className="w-full"
          >
            <div className=" grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
              <div className="col-span-full  ">
                <div className=" flex justify-center rounded-lg border border-dashed border-white/25 px-6 ">
                  <div className="text-center mt-5">
                    <ImageDownIcon
                      aria-hidden="true"
                      className="mx-auto size-12 text-gray-600"
                    />
                    <div>{fileUploaded}</div>
                    <div className="mt-4 flex text-sm/6 text-gray-400">
                      <label
                        htmlFor="image"
                        className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-400 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-500 hover:text-indigo-300"
                      >
                        {/* <span>Upload a file</span> */}
                        <input
                          id="image"
                          name="image"
                          type="file"
                          className=" border-none  outline-none "
                          onChange={(e) => console.log(e.target.value)}
                          multiple
                        />
                      </label>
                      {/* <p className="pl-1">or drag and drop</p> */}
                    </div>
                    <p className="text-xs/5 text-gray-400">PNG, JPG, GIF</p>
                  </div>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="name" className="block text-sm/6 font-medium ">
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Jone Dou"
                    autoComplete="given-name"
                    className="outline-1 shadow  outline-gray-600 block w-full rounded-md  px-3 py-1.5 text-base  -outline-offset-1  placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6"
                    required
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="stock" className="block text-sm/6 font-medium ">
                  Stock: <span></span>
                </label>
                <div className="mt-2">
                  <input
                    id="stock"
                    type="text"
                    name="stock"
                    placeholder="000"
                    autoComplete="given-name"
                    className="outline-1 shadow  outline-gray-600 block w-full rounded-md  px-3 py-1.5 text-base  -outline-offset-1  placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6"
                    required
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="price" className="block text-sm/6 font-medium ">
                  Price: <span></span>
                </label>
                <div className="mt-2">
                  <input
                    id="price"
                    type="text"
                    name="price"
                    placeholder="0,000"
                    autoComplete="given-name"
                    className="outline-1 shadow  outline-gray-600 block w-full rounded-md  px-3 py-1.5 text-base  -outline-offset-1  placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6"
                    required
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="categoryId" className="block text-sm/6 font-medium">
                  Category
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    id="categoryId"
                    name="categoryId"
                    autoComplete="categoryId-name"
                    className="shadow  outline-gray-600 col-start-1 row-start-1 w-full appearance-none rounded-md  py-1.5 pr-8 pl-3 text-base text-gray-600 outline-1 -outline-offset-1  *:bg-gray-200 *:rounded-md focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6"
                    required
                  >
                    <option  className=" disabled ">Choose Category...</option>
                    {category.map((catg:Categories)=>
                    
                    <option key={catg.id} value={catg.id} className="text-black">
                      {catg.name}
                    </option>
                    )}
                  </select>

                  <svg
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    data-slot="icon"
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-400 sm:size-4"
                  >
                    <path
                      d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="description"
                  className="block text-sm/6 font-medium "
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Category info...."
                    autoComplete="given-name"
                    className="outline-1 shadow  outline-gray-600 block w-full rounded-md  px-3 py-1.5 text-base  -outline-offset-1  placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6"
                    required
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center">
              <button
                type="submit"
                className="font-bold disabled:from-gray-500 disabled:to-gray-500 cursor-pointer hover:from-blue-600 max-w-100 w-full mt-8 text-gray-50 p-2 rounded-2xl bg-linear-to-r from-purple-600 to-blue-600"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
      {loading ? <Loader /> : ""}
    </section>
  );
};

export default CreateProduct;
