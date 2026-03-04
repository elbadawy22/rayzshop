"use client";
import {
  Edit,
  ImageDownIcon,
  MessageCircleWarning,
  Save,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import {  Products } from "../../lib/taypes";

import DeleteCategory from "./DeleteProduct";
import Image from "next/image";
import Loader from "../../components/loader/Loader";
import { updateProduct } from "../../lib/services/client/products.services";

const ProductDetailes = ({ product }: { product: Products }) => {
  const [categoryData, setCategoryData] = useState<Products>(product);
  const [nameInput, setNameInput] = useState<boolean>(false);
  const [descriptionInput, setDescriptionInput] = useState<boolean>(false);
  const [imageInput, setImageInput] = useState<boolean>(false);
  const [fileUploaded, setFileUploaded] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handelSubmit = async (e: FormData) => {
    const updated = await updateProduct(e, product.id).then((res) => res);
    if (updated?.data) {
      setCategoryData(updated.data);
      toast.success(updated.message, { className: "bg-white" });
    } else {
      toast.error(updated?.message);
    }
    setNameInput(false);
    setDescriptionInput(false);
    setImageInput(false);
    setLoading(false);
  };
  return (
    <section>
      <div className="  w-full ">
        <div className=" p-5  w-full flex flex-col  md:gap-10 justify-around items-center">
          <form
            action={handelSubmit}
            onSubmit={() => setLoading(true)}
            className="flex flex-col md:flex-row gap-4 md:gap-15 overflow-hidden drop-shadow-gray-300 drop-shadow-md   items-center rounded-md py-3 justify-center bg-white max-w-150 lg:max-w-250 w-full"
          >
            <div className="flex flex-col  px-3 w-full  justify-center itemes-center  ">
              {/* image  */}
              <div className=" gap-1 flex items-center justify-end">
                {imageInput ? (
                  <div className="flex items-center gap-1">
                    <button type="submit">
                      {" "}
                      <Save className="w-4 cursor-pointer hover:text-blue-500 text-gray-500" />{" "}
                    </button>
                    <span onClick={() => setImageInput(false)}>
                      <X className="w-4 cursor-pointer hover:text-red-600 text-red-300" />
                    </span>
                  </div>
                ) : (
                  <Edit
                    onClick={() => {
                      setImageInput(true);
                      setNameInput(false);
                      setDescriptionInput(false);
                      setFileUploaded("");
                    }}
                    className="w-4 cursor-pointer hover:text-blue-500 text-gray-500"
                  />
                )}
              </div>{" "}
              {/* image cover Change */}
              <div className="text-sm px-5 flex justify-center  text-gray-600 ">
                {imageInput ? (
                  <>
                    <div className="col-span-full">
                      <div className=" flex justify-center rounded-lg border border-dashed border-white/25 px-6 ">
                        <div className="text-center">
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
                              <span>Upload a file</span>
                              <input
                                id="image"
                                name="image"
                                type="file"
                                className="sr-only"
                                onChange={(e) =>
                                  setFileUploaded(e.target.value)
                                }
                              />
                            </label>
                            {/* <p className="pl-1">or drag and drop</p> */}
                          </div>
                          <p className="text-xs/5 text-gray-400">
                            PNG, JPG, GIF
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <Image
                    width={200}
                    height={200}
                    src={categoryData.image[0]?.url}
                    alt={categoryData.image[0]?.id}
                    className=""
                  />
                )}
              </div>
            </div>
            {/* Name And Description */}
            <div className="w-full md:w-fit">
              <div className="flex flex-col  px-10">
                <div className="border-b border-gray-300 mb-2 pb-2">
                  <div className=" gap-1 flex items-center justify-between">
                    <span className="font-bold ">Name:</span>
                    {nameInput ? (
                      <div className="flex items-center gap-1">
                        <button type="submit">
                          {" "}
                          <Save className="w-4 cursor-pointer hover:text-blue-500 text-gray-500" />{" "}
                        </button>
                        <span onClick={() => setNameInput(false)}>
                          <X className="w-4 cursor-pointer hover:text-red-600 text-red-300" />
                        </span>
                      </div>
                    ) : (
                      <Edit
                        onClick={() => {
                          setNameInput(true);
                          setImageInput(false);
                          setDescriptionInput(false);
                          setFileUploaded("");
                        }}
                        className="w-4 cursor-pointer hover:text-blue-500 text-gray-500"
                      />
                    )}
                  </div>
                  <p className="text-sm px-5 text-gray-600">
                    {nameInput ? (
                      <input
                        name="name"
                        type="text"
                        autoFocus
                        className="outline-none text-blue-500"
                        required
                        defaultValue={categoryData?.name}
                      />
                    ) : (
                      categoryData?.name || "N/A"
                    )}
                  </p>
                </div>
              </div>
              <div className="flex flex-col  px-10">
                <div className="border-b border-gray-300 mb-2 pb-2">
                  <div className="gap-1 flex items-center justify-between">
                    <span className="font-bold">Description:</span>
                    {descriptionInput ? (
                      <div className="flex items-center gap-1">
                        <button type="submit">
                          {" "}
                          <Save className="w-4 cursor-pointer hover:text-blue-500 text-gray-500" />{" "}
                        </button>
                        <span onClick={() => setDescriptionInput(false)}>
                          <X className="w-4 cursor-pointer hover:text-red-600 text-red-300" />
                        </span>
                      </div>
                    ) : (
                      <Edit
                        onClick={() => {
                          setNameInput(false);
                          setImageInput(false);
                          setDescriptionInput(true);
                          setFileUploaded("");
                        }}
                        className="w-4 cursor-pointer hover:text-blue-500 text-gray-500"
                      />
                    )}
                  </div>{" "}
                  <div className="text-sm px-5 text-gray-600 w-full overflow-auto ">
                    {descriptionInput ? (
                      <textarea
                        name="description"
                        autoFocus
                        className="outline-none text-blue-500 w-full   lg:min-w-88 h-50 max-h-50"
                        required
                        defaultValue={categoryData?.description}
                      ></textarea>
                    ) : (
                      <div className="w-full  max-h-50 overflow-auto ">
                        {categoryData?.description}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Products */}

      </div>
      <DeleteCategory product={product} />
      {loading ? <Loader /> : ""}
    </section>
  );
};

export default ProductDetailes;
