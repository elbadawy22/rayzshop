"use client";
import { ChevronRight, Edit, Save, X } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { UsersDots } from "../../lib/taypes";
import { useAuth } from "../../providers/AuthProvider";
import { updateProfile } from "../../lib/services/client/me.services";
import Link from "next/link";

const UserProfile = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<UsersDots>(user);
  const [nameInput, setNameInput] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<boolean>(false);
  const [phoneInput, setPhoneInput] = useState<boolean>(false);
  console.log(user);

  const handelSubmit = async (e: FormData) => {
    const updated = await updateProfile(e).then((res) => res);

    if (updated?.user) {
      setUserData(updated.user);
      toast.success(updated.message, { className: "bg-white" });
    } else {
      toast.error(updated?.message);
    }
    setNameInput(false);
    setPasswordInput(false);
    setPhoneInput(false);
  };
  return (
    <section>
      <div className=" w-full ">
        <div className=" p-5  w-full flex flex-col gap-5 md:gap-5 justify-around items-center">
          {/* User personal data and edit data form */}
          <form
            action={handelSubmit}
            className="flex flex-col  gap-10 md:gap-15  drop-shadow-gray-300 drop-shadow-md    rounded-md py-3 justify-center bg-white max-w-150 lg:max-w-200 w-full"
          >
            <div className="w-full flex justify-center  items-center">
              <div className=" flex justify-center   items-center overflow-hidden border border-gray-300 drop-shadow-gray-300 drop-shadow-lg  w-40 h-40 rounded-full bg-gray-200 text-white  text-9xl">
                {userData?.name?.trim().charAt(0).toUpperCase() || "U"}
              </div>
            </div>
            <div className="w-full ">
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
                          setPasswordInput(false);
                          setPhoneInput(false);
                        }}
                        className="w-4 cursor-pointer hover:text-blue-500 text-gray-500"
                      />
                    )}
                  </div>{" "}
                  <p className="text-sm px-5 text-gray-600">
                    {nameInput ? (
                      <input
                        name="name"
                        type="text"
                        autoFocus
                        className="outline-none text-blue-500"
                        required
                        defaultValue={userData?.name}
                      />
                    ) : (
                      userData?.name || "N/A"
                    )}
                  </p>
                </div>
                <div className="border-b border-gray-300 mb-2 pb-2">
                  <div className="gap-1 flex items-center justify-between">
                    <span className="font-bold">Email:</span>
                  </div>
                  <p className="text-sm px-5 text-gray-600">
                    {userData?.email}
                  </p>
                </div>
              </div>
              <div className="flex flex-col  px-10">
                <div className="border-b border-gray-300 mb-2 pb-2">
                  <div className="gap-1 flex items-center justify-between">
                    <span className="font-bold">Phone:</span>
                    {phoneInput ? (
                      <div className="flex items-center gap-1">
                        <button type="submit">
                          {" "}
                          <Save className="w-4 cursor-pointer hover:text-blue-500 text-gray-500" />{" "}
                        </button>
                        <span onClick={() => setPhoneInput(false)}>
                          <X className="w-4 cursor-pointer hover:text-red-600 text-red-300" />
                        </span>
                      </div>
                    ) : (
                      <Edit
                        onClick={() => {
                          setNameInput(false);
                          setPasswordInput(false);
                          setPhoneInput(true);
                        }}
                        className="w-4 cursor-pointer hover:text-blue-500 text-gray-500"
                      />
                    )}
                  </div>{" "}
                  <p className="text-sm px-5 text-gray-600">
                    {phoneInput ? (
                      <input
                        name="phone"
                        type="text"
                        autoFocus
                        className="outline-none text-blue-500"
                        required
                        defaultValue={userData?.phone}
                      />
                    ) : (
                      userData?.phone || "N/A"
                    )}
                  </p>
                </div>
                <div className="border-b border-gray-300 mb-2 pb-2">
                  <div className="gap-1 flex items-center justify-between">
                    <span className="font-bold">Password:</span>
                    {passwordInput ? (
                      <div className="flex items-center gap-1">
                        <button type="submit">
                          {" "}
                          <Save className="w-4 cursor-pointer hover:text-blue-500 text-gray-500" />{" "}
                        </button>
                        <span onClick={() => setPasswordInput(false)}>
                          <X className="w-4 cursor-pointer hover:text-red-600 text-red-300" />
                        </span>
                      </div>
                    ) : (
                      <Edit
                        onClick={() => {
                          setNameInput(false);
                          setPasswordInput(true);
                          setPhoneInput(false);
                        }}
                        className="w-4 cursor-pointer hover:text-blue-500 text-gray-500"
                      />
                    )}
                  </div>{" "}
                  <p className="text-sm px-5 text-gray-600">
                    {passwordInput ? (
                      <input
                        type="password"
                        name="password"
                        autoFocus
                        className="outline-none text-blue-500"
                        required
                        placeholder="••••••••••••"
                      />
                    ) : (
                      "••••••••••••"
                    )}
                  </p>
                </div>
              </div>
            </div>
          </form>
          <div className=" grid grid-1 md:grid-cols-2  gap-4 md:gap-15  drop-shadow-gray-300 drop-shadow-md    rounded-md py-5  bg-white max-w-150 lg:max-w-200 w-full">
            {user?.role === "CUSTTOMER" ? (
              <Link
                href="/me/orders"
                className="border-l-2 border-gray-300 border-b px-3 mx-2 max-w-50 hover:max-w-70 flex transition-all duration-500 justify-between gap-5  items-center  hover:bg-gray-200 py-2 rounded-md text-gray-700"
              >
                <p>My Orders</p>
                <ChevronRight className="w-5  " />
              </Link>
            ) : (
              ""
            )}
            {user?.role === "PRODUCTS_MANAGER" || user?.role === "ADMIN"   ? (
              <>
                <Link
                  href="/me/products"
                className="border-l-2  border-gray-300 border-b px-3 mx-2 max-w-50 hover:max-w-70 flex transition-all duration-500 justify-between gap-5  items-center  hover:bg-gray-200 py-2 rounded-md text-gray-700"
                >
                  <p>My Products</p>
                  <ChevronRight className="w-5" />
                </Link>
                <Link
                  href="/me/categories"
                className="border-l-2 border-gray-300 border-b px-3 mx-2 max-w-50 hover:max-w-70 flex transition-all duration-500 justify-between gap-5  items-center  hover:bg-gray-200 py-2 rounded-md text-gray-700"
                >
                  <p>My Categories</p>
                  <ChevronRight className="w-5" />
                </Link>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
