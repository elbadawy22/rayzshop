"use client";

import { Orders } from "@/app/(frontend)/lib/taypes";
import { useAuth } from "@/app/(frontend)/providers/AuthProvider";
import Image from "next/image";
import Link from "next/link";

export default function page() {
  const { user } = useAuth();

  return (
    <>
      <div className="  bg-white w-full flex flex-col justify-center items-center  transition-all duration-100 ">
        {user?.role === "CUSTTOMER" ? (
          <>
            <div className="w-full justify-center items-center flex py-2 pb-4 ">
              <h1 className="border-t border-dashed border-b w-full text-center max-w-100 border-gray-300 py-1 font-bold ">My Orders</h1>
            </div>

            <div className="flex flex-col w-full  px-3 gap-10 max-w-300">
              {user.orders?.map((order: Orders) => (
                <div
                  key={order.id}
                  className="flex flex-col sm:flex-row  gap-2 shadow px-3 py-2 rounded-md "
                >
                  <Link
                    href={`/me/orders/${order.id}`}
                    className="border hover:scale-90 transition-all duration-300 border-gray-200 shadow rounded-md p-1  grid grid-cols-2"
                  >
                    {order.orderItems?.map((itm) => (
                      <Image
                        key={itm.product?.image[0]?.id}
                        src={itm.product?.image[0]?.url}
                        alt={itm.product?.image[0]?.id}
                        width={70}
                        height={70}
                        className="w-full"
                      />
                    ))}
                  </Link>
                  <div className="flex flex-col gap-3  wrap-anywhere ">
                    <div className="px-2">
                      <p className=" ">{order.deliveryAddress}</p>
                      <p
                        className={`px-2 py-1  text-center max-w-25 text-xs rounded-full ${
                          order.status === "DELIVERED"
                            ? "bg-green-100 text-green-700"
                            : order.status === "CANCELED"
                              ? "bg-red-100 text-red-700"
                              : order.status === "PENDING"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {order.status}
                      </p>
                      <p
                        className={`text-sm ${
                          order.status === "DELIVERED"
                            ? " text-green-700"
                            : order.status === "CANCELED"
                              ? " text-red-700"
                              : order.status === "PENDING"
                                ? " text-yellow-700"
                                : " text-blue-700"
                        }`}
                      >
                        {order.status === "DELIVERED"
                          ? "Has been delivered Successfuly"
                          : order.status === "CANCELED"
                            ? "Has been Cancelled"
                            : order.status === "PENDING"
                              ? "Waiting for Confirmation"
                              : "Confirmed...Shipping in progress"}
                      </p>
                    </div>
                    <div>
                      <span className="text-blue-500 font-bold">
                        ${order?.totalPrice}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
