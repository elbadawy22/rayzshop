"use client";
import { useState } from "react";
import { Menu, ShoppingBasket, X } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Categories, UserProfile, UsersDots } from "../../lib/taypes";
import DropDownUserInfo from "./DropDownUserInfo";
import { logOut } from "../../lib/auth/logOut";
import { useRouter } from "next/navigation";
import SearchResults from "./SearchResults";
import Cart from "./Cart";
import { useAuth } from "../../providers/AuthProvider";
export const Navbar = ({ category }: { category: Categories[] }) => {
  const [open, setOpen] = useState(false);
  const pathnameRout = usePathname();
  const { user }: any = useAuth() as UserProfile | null;
  const handleClick = () => {
    setOpen(!open);
  };
  const router = useRouter();

  const handelLogOut = async () => {
    await logOut();
    router.refresh();
  };
  return (
    <nav className="sticky top-0  z-500000  w-full  ">
      <div className=" border-b border-b-slate-200  flex justify-between md:justify-start items-center bg-white md:h-10  h-13 w-full">
        {/* Mobile  Toggle */}
        <div
          className="px-4 md:hidden Hamburger-Cross-Icons"
          onClick={handleClick}
        >
          {open ? (
            <X className="text-gray-700" />
          ) : (
            <Menu className="text-gray-700" />
          )}
        </div>
        <div className="md:hidden  ">
          <SearchResults />
        </div>
        <h3 className=" text-sm  md:px-5  pr-2 font-extrabold bg-linear-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Rayz Shop
        </h3>
        {/*Mobile Sidebar */}
        <div
          onDoubleClick={() => setOpen(false)}
          className={`${!open ? "-translate-x-150 " : ""}  md:hidden  flex flex-col    top-11   -translate-x-7 transition-all ease-(--my-ease) duration-300  justify-between bg-white z-1 fixed h-[95%] max-w-150  w-[80%] px-10`}
        >
          <div className=" max-h-[80%]  ">
            <div className="flex items-center gap-2  text-gray-500 px-10 border-b border-b-gray-300 pt-3 ">
              <ShoppingBasket className="text-gray-600" />
              <p className="text-lg font-extrabold bg-linear-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Rayz Shop
              </p>
            </div>
            <ul className="px-1 pt-5  max-h-[90%] flex flex-col gap-5 overflow-y-scroll ">
              <li
                className={`  border-b-2 border-b-gray-100 text-gray-600  hover:bg-gray-200 rounded py-2 w-full`}
              >
                <Link
                  href={`/`}
                  className="   p-1 px-3"
                  onClick={() => setOpen(false)}
                >
                  Home
                </Link>
              </li>
              {user?.role === "ADMIN" ? (
                <li
                  className={`  border-b-2 border-b-gray-100 text-gray-600  hover:bg-gray-200 rounded py-2 w-full`}
                >
                  <Link
                    href={`/admin/users`}
                    className="   p-1 px-3"
                    onClick={() => setOpen(false)}
                  >
                    Users
                  </Link>
                </li>
              ) : (
                ""
              )}
              {user?.role === "ADMIN" ? (
                <li
                  className={`  border-b-2 border-b-gray-100 text-gray-600  hover:bg-gray-200 rounded py-2 w-full`}
                >
                  <Link
                    href={`/admin`}
                    className="   p-1 px-3"
                    onClick={() => setOpen(false)}
                  >
                    Dashboard
                  </Link>
                </li>
              ) : (
                ""
              )}
              {user?.role === "ADMIN" || user?.role === "PRODUCTS_MANAGER" ? (
                <li
                  className={`  border-b-2 border-b-gray-100 text-gray-600  hover:bg-gray-200 rounded py-2 w-full`}
                >
                  <Link
                    href={`/admin/products`}
                    className="   p-1 px-3"
                    onClick={() => setOpen(false)}
                  >
                    Products
                  </Link>
                </li>
              ) : (
                ""
              )}
              {user?.role === "ADMIN" || user?.role === "PRODUCTS_MANAGER" ? (
                <li
                  className={`  border-b-2 border-b-gray-100 text-gray-600  hover:bg-gray-200 rounded py-2 w-full`}
                >
                  <Link
                    href={`/admin/categories`}
                    className="   p-1 px-3"
                    onClick={() => setOpen(false)}
                  >
                    Categories
                  </Link>
                </li>
              ) : (
                ""
              )}
              {user?.role === "ADMIN" || user?.role === "ORDER_MANAGER" ? (
                <li
                  className={`  border-b-2 border-b-gray-100 text-gray-600  hover:bg-gray-200 rounded py-2 w-full`}
                >
                  <Link
                    href={`/admin/orders`}
                    className="   p-1 px-3"
                    onClick={() => setOpen(false)}
                  >
                    Orders
                  </Link>
                </li>
              ) : (
                ""
              )}

              <li
                className={`  border-b-2 border-b-gray-100 text-gray-600  hover:bg-gray-200 rounded py-2 w-full`}
              >
                <Link
                  href={`/products`}
                  className="   p-1 px-3"
                  onClick={() => setOpen(false)}
                >
                  All Products
                </Link>
              </li>
              {category?.map((Item, index) => {
                return (
                  <li
                    key={index}
                    className={`${pathnameRout == Item.id ? "bg-gray-200 text-gray-900" : "border-b-2 border-b-gray-100"} text-gray-600  hover:bg-gray-200 rounded py-2 w-full`}
                  >
                    <Link
                      href={`/products?categoryId=${Item.id}`}
                      className="   p-1 px-3"
                      onClick={() => setOpen(false)}
                    >
                      {Item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className=" border-t-2 border-gray-300 pt-2 pb-20">
            <div className=" flex justify-between   px-2    ">
              {user?.role ? (
                <>
                  <Link
                    onClick={() => setOpen(false)}
                    href="/me"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <span className="bg-gray-400 w-8 h-8 flex justify-center items-center text-sm px-3 py-2 text-white  rounded-full">
                      {user?.name?.split("")[0]?.toUpperCase()}
                    </span>
                    <p className="text-gray-800 text-sm">{user?.name}</p>
                  </Link>
                  <form action={handelLogOut} className=" flex justify-end">
                    <button
                      onClick={() => setOpen(false)}
                      type="submit"
                      className="text-red-700 px-2 bg-red-50 rounded-md p-1 flex justify-center items-center"
                    >
                      Logout
                    </button>
                  </form>
                </>
              ) : (
                <div className="flex items-center gap-3 text-slate-500 text-sm">
                  <Link
                    href="/login"
                    className="hover:text-blue-500 cursor-pointer"
                    onClick={() => setOpen(false)}
                  >
                    Login
                  </Link>
                  <span>|</span>
                  <Link
                    href="/register"
                    className="hover:text-blue-500 cursor-pointer"
                    onClick={() => setOpen(false)}
                  >
                    Create Account
                  </Link>
                </div>
              )}
            </div>
            <div className="flex items-center gap-4 text-gray-500"></div>
          </div>
        </div>
        {/* Desktop */}

        <div className="hidden md:grow  md:flex md:items-center md:justify-around  ">
          <SearchResults />
          <div className="w-full flex items-center justify-end gap-3">
            {/*  */}

            {user?.role ? (
              <form
                action={handelLogOut}
                className="w-full flex items-center justify-end gap-3"
              >
                <DropDownUserInfo user={user} />
              </form>
            ) : (
              <div className="flex items-center gap-3 text-slate-500 text-sm">
                <Link
                  href="/login"
                  className="hover:text-blue-500 cursor-pointer"
                >
                  Login
                </Link>
                <span>|</span>
                <Link
                  href="/register"
                  className="hover:text-blue-500 cursor-pointer"
                >
                  Create Account
                </Link>
              </div>
            )}
            {/*  */}
          </div>
        </div>
      </div>
      <div className=" hidden md:block bg-white    ">
        <ul className=" flex items-center gap-7 px-1 p overflow-auto no-scrollbar">
          <li
            className={`text-gray-600 px-1  hover:bg-gray-200 rounded py-1 w-full`}
          >
            <Link
              href={`/`}
              className="text-sm  flex justify-center"
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
          </li>
          {user?.role === "ADMIN" ? (
            <li
              className={`text-gray-600 px-1  hover:bg-gray-200 rounded py-1 w-full`}
            >
              <Link
                href={`/admin`}
                className="text-sm  flex justify-center"
                onClick={() => setOpen(false)}
              >
                Dashboard
              </Link>
            </li>
          ) : (
            ""
          )}
          {user?.role === "ADMIN" ? (
            <li
              className={`text-gray-600 px-1  hover:bg-gray-200 rounded py-1 w-full`}
            >
              <Link
                href={`/admin/users`}
                className="text-sm  flex justify-center"
                onClick={() => setOpen(false)}
              >
                Users
              </Link>
            </li>
          ) : (
            ""
          )}
          {user?.role === "ADMIN" || user?.role === "PRODUCTS_MANAGER" ? (
            <li
              className={`text-gray-600 px-1  hover:bg-gray-200 rounded py-1 w-full`}
            >
              <Link
                href={`/admin/products`}
                className="text-sm  flex justify-center"
                onClick={() => setOpen(false)}
              >
                Products
              </Link>
            </li>
          ) : (
            ""
          )}
          {user?.role === "ADMIN" || user?.role === "PRODUCTS_MANAGER" ? (
            <li
              className={`text-gray-600 px-1  hover:bg-gray-200 rounded py-1 w-full`}
            >
              <Link
                href={`/admin/categories`}
                className="text-sm  flex justify-center"
                onClick={() => setOpen(false)}
              >
                Categories
              </Link>
            </li>
          ) : (
            ""
          )}
          {user?.role === "ADMIN" || user?.role === "ORDER_MANAGER" ? (
            <li
              className={`text-gray-600 px-1  hover:bg-gray-200 rounded py-1 w-full`}
            >
              <Link
                href={`/admin/orders`}
                className="text-sm  flex justify-center"
                onClick={() => setOpen(false)}
              >
                Orders
              </Link>
            </li>
          ) : (
            ""
          )}
          <li
            className={`text-gray-600 px-1  hover:bg-gray-200 rounded py-1 w-full`}
          >
            <Link
              href={`/products`}
              className="text-sm flex justify-center "
              onClick={() => setOpen(false)}
            >
              All Products
            </Link>
          </li>
          {category?.map((Item, index) => {
            return (
              <li
                key={index}
                className={`text-gray-600 px-1 hover:bg-gray-200 rounded py-1 w-full`}
              >
                <Link
                  href={`/products?categoryId=${Item.id}`}
                  className="text-sm flex justify-center "
                >
                  {Item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {open ? (
        <div
          className="absolute w-screen h-screen backdrop-blur-xs "
          onClick={() => setOpen(false)}
        ></div>
      ) : (
        ""
      )}
      <div className="w-full">
        {(!user?.role ||
          user?.role == "CUSTTOMER" ||
          user?.role == "ORDER_MANAGER" ||
          user?.role == "ADMIN") &&
        pathnameRout !== "/order" &&
        !pathnameRout.startsWith("/admin") ? (
          <Cart />
        ) : (
          ""
        )}
      </div>
    </nav>
  );
};
