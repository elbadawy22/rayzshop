"use client";

import { Handbag, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { useCart } from "../../providers/CartProvider";
import Link from "next/link";
// import { useRouter } from "next/navigation";

const Cart = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { items } = useCart();
  const { removeItem } = useCart();
  const { addItem } = useCart();
  const { removequantity } = useCart();

  return (
    <>
      <div className="z-1 fixed bottom-10 right-7 text-gray-700 bg-gray-100 flex justify-center items-center w-10 h-10 rounded-full">
        <div
          className="hover:scale-125 flex flex-col justify-center items-center cursor-pointer transition-all ease-in-out duration-300  "
          onClick={() => setOpen(!open)}
        >
          <span className="absolute  mt-2  flex justify-center items-center p-1 text-xs font-bold text-red-800 w-3 h-3 rounded-full">
            {items.length || 0}
          </span>
          <Handbag className="w-7 h-7  " />
        </div>
      </div>

      <>
        <div
          className={`${!open ? " translate-x-150 sm:translate-x-250 md:translate-x-400 lg:translate-x-700 xl:translate-x-2000 2xl:translate-x-2000  " : ""}   -translate-x-5 md:-translate-x-10 transition-all ease-(--my-ease) duration-300 flex flex-col  bg-white z-1 fixed h-screen max-w-150 top-0 w-[80%] px-10 `}
        >
          <div className="mt-7 flex justify-center items-center gap-2 border-b-2 border-gray-300 pb-2">
            {items.length > 0 ? (
              <span className="flex justify-center items-center  text-gray-50 font-bold w-5 h-5 bg-red-800  rounded-full">
                {items.length}
              </span>
            ) : (
              ""
            )}
            <Handbag className="text-slate-600 " />
            <h3 className=" text-center font-extrabold bg-linear-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent ">
              Your Cart
            </h3>
          </div>
          <div className=" border-b-2 max-h-[70%] border-gray-300 overflow-y-auto flex flex-col">
            {/* products cart */}

            {items.length > 0 ? (
              items.map((item, i) => (
                <div
                  className="border-b border-b-gray-300 py-2 flex justify-between"
                  key={i}
                >
                  <div className="max-w-50 md:max-w-120 flex flex-col md:flex-row gap-1 ">
                    <Image
                      className="w-30"
                      src={item?.image[0]?.url}
                      alt={item?.name}
                      width={250}
                      height={250}
                    />
                    <div>
                      <div className="flex gap-2 ">
                        <h3 className="text-sm">{item?.name}</h3>
                      </div>
                      <div className="flex justify-between max-w-69">
                        <span className="text-xs text-blue-600 bg-blue-100 px-1 rounded-2xl">
                          {item.category.name}
                        </span>
                        <div className="  max-w-13 rounded-2xl text-xs  overflow-hidden ml-5  flex justify-between items-center border border-gray-300  bg-gray-100">
                          <span
                            onClick={() => removequantity(item)}
                            className="hover:bg-red-200 cursor-pointer flex justify-center items-center  font-bold px-1 w-full bg-white border-r border-r-gray-300 text-slate-900 "
                          >
                            -
                          </span>
                          <span className="flex justify-center items-center  font-bold w-full text-slate-900 px-1">
                            {item?.quantity}
                          </span>
                          <span
                            onClick={() => addItem(item)}
                            className=" cursor-pointer flex justify-center items-center hover:bg-blue-200 font-bold w-full px-1 bg-white border-l border-l-gray-300 text-slate-900"
                          >
                            +
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between max-w-70 mt-3">
                        <span className="text-blue-500 font-bold text-sm">
                          ${item.price.toLocaleString()}
                        </span>
                        <span className="text-red-700  text-xs">
                          {item.stock} in Stock
                        </span>
                      </div>
                    </div>
                  </div>
                  <X
                    onClick={() => removeItem(item.id)}
                    className="text-red-700 w-4 cursor-pointer"
                  />
                </div>
              ))
            ) : (
              <div className="px-3 text-gray-400 text-center">
                Add to your cart...
              </div>
            )}
          </div>

          {items.length > 0 ? (
            <div className="   flex flex-col ">
              <h1 className="font-bold px-3">Total:</h1>
              <div className="flex px-10 gap-10">
                <h3 className="   font-bold ">
                  <span className="text-slate-700">Price: </span>
                  <span className="text-blue-600">
                    {" "}
                    ${items.reduce((item, i) => item + i.price * i.quantity, 0).toLocaleString()}
                  </span>
                </h3>
                <h4 className="   font-bold ">
                  <span className="text-slate-700">Items: </span>
                  {items.reduce((item, i) => item + i.quantity, 0)}
                </h4>
              </div>
              <div className=" w-full p-3 flex justify-center items-center ">
                <Link onClick={() => setOpen(false)} href="/order" className=" text-center cursor-pointer hover:bg-blue-500 font-bold py-1 max-w-70 text-gray-50 bg-blue-600 w-full rounded-lg">
                  Check out
                </Link>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div
          onClick={() => setOpen(false)}
          className={`${!open ? "hidden" : ""} transition-all  duration-200 backdrop-blur-xs    fixed h-screen  top-0 w-[99%] px-10`}
        ></div>
      </>
    </>
  );
};

export default Cart;
