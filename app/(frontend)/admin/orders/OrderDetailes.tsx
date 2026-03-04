"use client";

import { Edit, Eye, Save, X } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Categories, Orders, Products, UsersDots } from "../../lib/taypes";
import { updateUser } from "../../lib/services/client/users.services";
import DeleteUser from "./DeleteOrder";
import { updateOrder } from "../../lib/services/client/orders.services";
import Link from "next/link";
import Image from "next/image";
interface UserDetailesDots extends UsersDots {
  products?: Products[];
  categories?: Categories[];
  orders?: [];
}

const UserDetailes = ({ order }: { order: Orders }) => {
  const [orderData, setOrderData] = useState<Orders>(order);
  const [roleInput, setRoleInput] = useState<boolean>(false);

  const handelSubmit = async (e: FormData) => {
    const updated = await updateOrder(e, order.id).then((res) => res);

    if (updated?.order) {
      setOrderData(updated.order);
      toast.success(updated.message, { className: "bg-white" });
    } else {
      toast.error(updated?.message);
    }

    setRoleInput(false);
  };
  return (
    <section>
      <div className="  w-full ">
        <div className=" p-5  w-full flex flex-col  md:gap-10 justify-around items-center">
          {/*  user Image */}

          {/* User personal data and edit data form */}
          <form
            action={handelSubmit}
            className="flex flex-col md:flex-row gap-4 md:gap-15  drop-shadow-gray-300 drop-shadow-md   items-center rounded-md py-3 justify-center bg-white max-w-150 lg:max-w-200 w-full"
          >
            <div className="w-full px-5 ">
              <h3 className="w-full text-center pb-5 text-lg font-bold" >Order Detailes</h3>
              <div className="  grid md:grid-cols-3 gap-5">
                <div className="border-b border-gray-300 mb-2 pb-2">
                  <div className=" gap-1 flex items-center justify-between">
                    <span className="font-bold "> Name:</span>
                  </div>{" "}
                  <p className="text-sm px-5 text-gray-600">
                    {order.user?.name || order.guestOrderInfo?.name}
                  </p>
                </div>
                <div className="border-b border-gray-300 mb-2 pb-2">
                  <div className="gap-1 flex items-center justify-between">
                    <span className="font-bold"> Email:</span>
                  </div>
                  <p className="text-sm px-5 text-gray-600">
                    {order.user?.email || "Guests Customers"}
                  </p>
                </div>
                <div className="border-b border-gray-300 mb-2 pb-2">
                  <div className="gap-1 flex items-center justify-between">
                    <span className="font-bold">Phone:</span>
                  </div>{" "}
                  <p className="text-sm px-5 text-gray-600">
                    {order.user?.phone || order.guestOrderInfo?.phone}
                  </p>
                </div>
                <div className="border-b border-gray-300 mb-2 pb-2">
                  <div className="gap-1 flex items-center justify-between">
                    <span className="font-bold">Total Price:</span>
                  </div>{" "}
                  <p className="text-sm px-5 text-gray-600">
                    ${order.totalPrice || 0}
                  </p>
                </div>
                <div className="border-b border-gray-300 mb-2 pb-2">
                  <div className="gap-1 flex items-center justify-between">
                    <span className="font-bold">Statu:</span>
                    {roleInput ? (
                      <div className="flex items-center gap-1">
                        <button type="submit">
                          {" "}
                          <Save className="w-4 cursor-pointer hover:text-blue-500 text-gray-500" />{" "}
                        </button>
                        <span onClick={() => setRoleInput(false)}>
                          <X className="w-4 cursor-pointer hover:text-red-600 text-red-300" />
                        </span>
                      </div>
                    ) : (
                      <Edit
                        onClick={() => {
                          setRoleInput(true);
                        }}
                        className="w-4 cursor-pointer hover:text-blue-500 text-gray-500"
                      />
                    )}
                  </div>{" "}
                  <div className="text-sm px-5 text-gray-600">
                    {roleInput ? (
                      <div className="grid grid-cols-1 ">
                        <select
                          name="status"
                          className="col-start-1 row-start-1 w-full  rounded-md    text-gray-600   *:bg-gray-200 outline-none  sm:text-sm/6"
                          required
                          defaultValue={orderData?.status}
                        >
                          <option value="" className=" disabled ">
                            Choose Statu...
                          </option>
                          <option value="CONFIRMED" className="text-black ">
                            CONFIRMED
                          </option>
                          <option value="DELIVERED" className="text-black">
                            DELIVERED
                          </option>
                          <option value="CANCELED" className="text-black">
                            CANCELED
                          </option>
                        </select>
                      </div>
                    ) : (
                      orderData?.status || "N/A"
                    )}
                  </div>
                </div>
              </div>
              <div className="border-b border-gray-300 mb-2 pb-2">
                <div className="gap-1 flex items-center justify-between">
                  <span className="font-bold">The Address:</span>
                </div>{" "}
                <p className="text-sm px-5 text-gray-600">
                  {order.deliveryAddress}
                </p>
              </div>
            </div>
          </form>
        </div>
        <div className="bg-white w-full   transition-all duration-100">
          <div className="flex justify-center items-center gap-10"></div>
          {/* Products */}
          {orderData?.orderItems && orderData.orderItems?.length > 0 ? (
            <div className="px-5  bg-white rounded-lg overflow-hidden">
              <div className="rounded-lg  w-full py-7 gap-y-5 grid grid-cols-2 md:grid-cols-3 gap-x-1  lg:grid-cols-4 px-3 overflow-hidden bg-white">
                {orderData?.orderItems?.map((itm) => (
                  <Link href={`/products/${itm.product.id}`} key={itm.id}>
                    <div className="w-full shadow-sm rounded-lg">
                      <div className="  flex flex-col items-center w-auto h-auto rounded-t-md overflow-hidden  ">
                        {itm.product.image?.length > 0 ? (
                          <Image
                            className="w-50  h-auto  hover:scale-75  transition-all duration-200 overflow-hidden cursor-pointer "
                            width={250}
                            height={250}
                            src={itm.product.image[0].url}
                            alt={itm.product.image[0].id}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="flex flex-col  px-2">
                        <div className="flex items-center">
                          <h3 className="text-slate-800 text-sm md:text-md font-bold overflow-x-hidden   ">
                            {itm.product.name.slice(0, 20)}
                            {itm.product.name.length > 20 ? (
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
                            <span className="text-[10px]">
                              {itm.product.stock}
                            </span>{" "}
                            <span>in stoke</span>
                          </span>
                          <span className="text-xs md:text-md text-blue-500 font-bold">
                            ${itm.product.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <DeleteUser order={orderData} />
    </section>
  );
};

export default UserDetailes;
