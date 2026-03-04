"use client";

import { Edit, Eye, Save, X } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Categories, Products, UsersDots } from "../../lib/taypes";
import { updateUser } from "../../lib/services/client/users.services";
import DeleteUser from "./DeleteUser";


const UserDetailes = ({ user }: { user: UsersDots }) => {
  const [userData, setUserData] = useState<UsersDots>(user);
  const [nameInput, setNameInput] = useState<boolean>(false);
  const [roleInput, setRoleInput] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<boolean>(false);
  const [phoneInput, setPhoneInput] = useState<boolean>(false);
  const [togelOrders, setTogelOrders] = useState<boolean>(false);
  const [togelCategories, setTogelCategories] = useState<boolean>(false);
  const [togelProducts, setTogelProducts] = useState<boolean>(false);
  const handelSubmit = async (e: FormData) => {
    const updated = await updateUser(e, user.id).then((res) => res);

    if (updated?.user) {
      setUserData(updated.user);
      toast.success(updated.message, { className: "bg-white" });
    } else {
      toast.error(updated?.message);
    }

    setNameInput(false);
    setPasswordInput(false);
    setRoleInput(false);
    setPhoneInput(false);
  };
  return (
    <section>
      <div className="  w-full ">
        <div className="  p-5  w-full flex flex-col  md:gap-10 justify-around items-center">
          {/*  user Image */}

          {/* User personal data and edit data form */}
          <form
            action={handelSubmit}
            className="flex flex-col md:flex-row gap-4 md:gap-15  drop-shadow-gray-300 drop-shadow-md   items-center rounded-md py-3 justify-center bg-white max-w-150 lg:max-w-200 w-full"
          >
            <div className=" flex justify-center  items-center overflow-hidden border border-gray-300 drop-shadow-gray-300 drop-shadow-lg  w-40 h-40 rounded-full bg-gray-300 text-white  text-9xl">
              {userData?.name?.trim().charAt(0).toUpperCase() || "U"}
            </div>
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
                          setPasswordInput(false);
                          setRoleInput(false);
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
                          setRoleInput(false);
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
                          setRoleInput(false);
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
              <div className="flex flex-col  px-10">
                <div className="border-b border-gray-300 mb-2 pb-2">
                  <div className="gap-1 flex items-center justify-between">
                    <span className="font-bold">Role:</span>
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
                          setNameInput(false);
                          setPasswordInput(false);
                          setRoleInput(true);
                          setPhoneInput(false);
                        }}
                        className="w-4 cursor-pointer hover:text-blue-500 text-gray-500"
                      />
                    )}
                  </div>{" "}
                  <div className="text-sm px-5 text-gray-600">
                    {roleInput ? (
                      <div className="grid grid-cols-1 ">
                        <select
                          name="role"
                          className="col-start-1 row-start-1 w-full  rounded-md    text-gray-600   *:bg-gray-200 outline-none  sm:text-sm/6"
                          required
                          defaultValue={userData?.role}
                        >
                          <option value="" className=" disabled ">
                            Choose Role...
                          </option>
                          <option value="ADMIN" className="text-black ">
                            Admin
                          </option>
                          <option
                            value="PRODUCTS_MANAGER"
                            className="text-black"
                          >
                            Products Manager
                          </option>
                          <option value="ORDER_MANAGER" className="text-black">
                            Orders Manager
                          </option>
                        </select>
                      </div>
                    ) : (
                      userData?.role || "N/A"
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="bg-white w-full   transition-all duration-100">
          <div className="flex justify-center items-center gap-10">
            {user.orders && user.orders?.length > 0 ? (
              <div
                onClick={() => {
                  setTogelCategories(false);
                  setTogelProducts(false);
                  setTogelOrders(true);
                }}
                className={`text-3xl pt-2 cursor-pointer ${togelOrders ? " duration-200 transition-all  border-b-2 border-gray-600" : "text-gray-500"}`}
              >
                <h1>Orders</h1>
              </div>
            ) : (
              ""
            )}
            {user.products && user.products?.length > 0 ? (
              <div
                onClick={() => {
                  setTogelCategories(false);
                  setTogelProducts(true);
                  setTogelOrders(false);
                }}
                className={`text-3xl pt-2 cursor-pointer ${togelProducts ? " duration-200 transition-all  border-b-2 border-gray-600" : "text-gray-500"}`}
              >
                <h1>Products</h1>
              </div>
            ) : (
              ""
            )}
            {user.categories && user.categories?.length > 0 ? (
              <div
                onClick={() => {
                  setTogelCategories(true);
                  setTogelProducts(false);
                  setTogelOrders(false);
                }}
                className={`text-3xl pt-2 cursor-pointer ${togelCategories ? " duration-200 transition-all  border-b-2 border-gray-600" : "text-gray-500"}`}
              >
                <h1>Categories</h1>
              </div>
            ) : (
              ""
            )}
          </div>
          {/* Products */}
          {togelProducts ? (
            <div className="px-5  bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                        Name
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                        Price
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                        Stock
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                        Created At
                      </th>

                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.products?.map((product) => (
                      <tr
                        key={product.id}
                        className="buser-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-3 px-4">{product.name}</td>
                        <td className="py-3 px-4 font-semibold">
                          {product.price}
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {product.stock}
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          <span>
                            {user.createdAt.split("T")[0].split("-")[2]}/
                            {user.createdAt.split("T")[0].split("-")[1]}/
                            {user.createdAt.split("T")[0].split("-")[0]}
                          </span>
                          {" @ "}
                          <span>
                            {product.createdAt.split("T")[1].slice(0, 5)}
                          </span>
                        </td>
                        <td className="py-3 px-4">{product.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
            </div>
          ) : (
            ""
          )}

          {/* Categories */}
          {togelCategories ? (
            <div className="px-5  bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                        Name
                      </th>

                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                        Stock
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                        Created At
                      </th>

                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.categories?.map((category) => (
                      <tr
                        key={category.id}
                        className="buser-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-3 px-4">{category.name}</td>

                        <td className="py-3 px-4 text-gray-600">
                          {category.stock}
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          <span>
                            {user.createdAt.split("T")[0].split("-")[2]}/
                            {user.createdAt.split("T")[0].split("-")[1]}/
                            {user.createdAt.split("T")[0].split("-")[0]}
                          </span>
                          {" @ "}
                          <span>
                            {category.createdAt.split("T")[1].slice(0, 5)}
                          </span>
                        </td>
                        <td className="py-3 px-4">{category.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <DeleteUser user={user} />
    </section>
  );
};

export default UserDetailes;
