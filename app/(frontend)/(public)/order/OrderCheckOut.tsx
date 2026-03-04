"use client";
import { Handbag, MessageCircleWarning, X } from "lucide-react";
import Image from "next/image";
import { useCart } from "../../providers/CartProvider";
import { useAuth } from "../../providers/AuthProvider";
import { UserProfile } from "../../lib/taypes";
import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { createNewOrder } from "../../lib/services/client/orders.services";
import { useRouter } from "next/navigation";
export default function OrderCheckOut() {
  const { items } = useCart();
  const { clearCart } = useCart();
  const { user }: any = useAuth() as UserProfile | null;
  const { removeItem } = useCart();
  const { addItem } = useCart();
  const { removequantity } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState(user?.deliveryAddress);
  const router = useRouter();

  const handelConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    const orderItems = [] as {
      id: string;
      quantity: number;
    }[];
    items?.map((itm) => orderItems.push({ id: itm.id, quantity: itm.quantity }));

    if (
      deliveryAddress &&
      typeof deliveryAddress === "string" &&
      deliveryAddress !== ""
    ) {
      console.log({ name, phone, deliveryAddress, orderItems });
      const creater = await createNewOrder({
        name,
        phone,
        deliveryAddress,
        orderItems,
      });
      console.log(creater);

      if (creater.ok) {
        const success = await creater.json();
        toast.success(success.message);
        if (user?.role === "CUSTTOMER") {
          router.replace("/me/orders");
        } else {
          router.replace("/products");
        }
        clearCart();
      }
      if (!creater.ok) {
        const fail = await creater.json();
        toast.error(fail.message);
      }
    } else {
      toast.error("Your Address is Rquierd");
    }
  };
  return (
    <>
      {items.length > 0 ? (
        <div className={` flex flex-col  bg-white  px-10 `}>
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
          <div className=" border-b-2 max-h-[70%] py-5 border-gray-300 overflow-y-auto grid sm:grid-cols-2 md:grid-cols-4 gap-3 md:m-auto ">
            {/* products cart */}

            {items.length > 0 ? (
              items?.map((item, i) => (
                <div
                  className="border-b shadow border-b-gray-300  py-3 px-2 flex justify-between "
                  key={i}
                >
                  <div className="max-w-50  md:max-w-120 flex flex-col justify-center items-center   gap-1 ">
                    <Image
                      className="w-30 flex justify-center items-center"
                      src={item?.image[0]?.url}
                      alt={item?.name}
                      width={250}
                      height={250}
                    />
                    <div>
                      <div className="flex gap-2 ">
                        <h3 className="text-sm">
                          {item?.name.slice(0, 25)}....
                        </h3>
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
            <div className="   flex flex-col border-b border-gray-300 pb-3 ">
              <h1 className="font-bold px-3">Total:</h1>
              <div className="flex px-10 gap-10">
                <h3 className="   font-bold ">
                  <span className="text-slate-700">Price: </span>
                  <span className="text-blue-600">
                    {" "}
                    $
                    {items
                      .reduce((item, i) => item + i.price * i.quantity, 0)
                      .toLocaleString()}
                  </span>
                </h3>
                <h4 className="   font-bold ">
                  <span className="text-slate-700">Items: </span>
                  {items.reduce((item, i) => item + i.quantity, 0)}
                </h4>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className=" mt-3 pb-5">
            <form onSubmit={handelConfirm}>
              <div className="w-full">
                <h1 className="w-full text-center text-lg font-bold">
                  Personal Data
                </h1>
              </div>
              <div className="flex gap-3 flex-col sm:flex-row">
                {user?.role !== "CUSTTOMER".toUpperCase() ? (
                  <>
                    <div className="flex flex-col ">
                      <label htmlFor="name" className="px-2">
                        Name:
                      </label>
                      <input
                        placeholder="Your name"
                        type="text"
                        name="name"
                        id="name"
                        className="outline-none border border-gray-400 px-2 rounded-md py-1"
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="true"
                        required
                      />
                    </div>
                    <div className="flex flex-col ">
                      <label htmlFor="phone" className="px-2">
                        Phone:
                      </label>
                      <input
                        placeholder="Your phone"
                        type="text"
                        name="phone"
                        id="phone"
                        className="outline-none border border-gray-400 px-2 rounded-md py-1"
                        onChange={(e) => setPhone(e.target.value)}
                        autoComplete="true"
                        required
                      />
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
              <div className="w-full mt-2 flex flex-col ">
                <label htmlFor="deliveryAddress" className="px-2">
                  Your Address:
                </label>
                <textarea
                  className="outline-none border border-gray-400 px-2 rounded-md py-1 "
                  name="deliveryAddress"
                  id="deliveryAddress"
                  placeholder="Your Address"
                  defaultValue={user?.deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                ></textarea>
              </div>
              <div className="w-full flex justify-center items-center mt-5 ">
                <button
                  type="submit"
                  className="w-full text-gray-50 bg-blue-500 rounded-md max-w-50 py-1 font-bold cursor-pointer hover:bg-blue-400 "
                >
                  Confirm Order
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className=" flex  justify-center h-full items-center w-full absolute to-20  text-gray-500 m-auto">
          <h1 className="flex gap-1">
            <MessageCircleWarning />
            No Cart Data !..
          </h1>
          <Link
            href="/products"
            className="text-sm text-blue-600 hover:text-blue-400"
          >
            Add Products
          </Link>
        </div>
      )}
    </>
  );
}
