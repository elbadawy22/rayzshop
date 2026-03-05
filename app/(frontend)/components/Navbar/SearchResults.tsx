"use client";
import { useState } from "react";
import Link from "next/link";
import { Products } from "../../lib/taypes";
import { getProductsClient } from "../../lib/services/client/products.services";
import { useRouter } from "next/navigation";

const SearchResults = () => {
  const [open, setOpen] = useState<boolean>(true);
  const [data, setdata] = useState<Products[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const router = useRouter();
  const handelChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setOpen(true);
    setSearchInput(e.target.value);
    const fetchSearch = await getProductsClient({
      search: e.target.value,
    }).then((res) => res.json());
    await setdata(fetchSearch.data);
    if (data.length > 0 && e.target.value != "") {
      setOpen(false);
    }
  };
  const handelEnter = async (e: FormData) => {
    const name = e.get("search") as string;
    setOpen(true);
    if (name != "") {
      router.push(`products?search=${name}`);
      setOpen(true);
    }
  };
  return (
    <>
      <form
        action={handelEnter}
        className="md:hidden grow w-full px-1 pr-3 sm:px-4"
      >
        <input
          type="search"
          placeholder="Search..."
          className=" focus:border-blue-500 focus:border focus:shadow-sm focus:shadow-blue-300 w-full text-gray-600 p-1 px-3 outline-none border border-gray-300 rounded-md  "
          defaultValue={searchInput}
          onChange={handelChange}
          name="search"
        />
      </form>
      <form
        action={handelEnter}
        className="hidden md:block grow w-full px-1 pr-3 sm:px-4"
      >
        <input
          type="search"
          placeholder="Search..."
          className=" focus:border-blue-500 focus:border focus:shadow-sm focus:shadow-blue-300 w-full text-gray-600 p-0.5 px-3 outline-none border border-gray-300 rounded-md  "
          defaultValue={searchInput}
          onChange={handelChange}
          name="search"
        />
      </form>
      {/* <!-- Dropdown menu --> */}
      <div className=" fixed z-1  right-0 px-5 pb-3 w-full overflow-hidden  top-11 md:top-9">
        <div
          hidden={open}
          className=" z-1 top-12 w-full max-w-200 rounded bg-white   rounded-base shadow-lg "
        >
          <div className="p-2  ">
            <div className="border-b-2 border-slate-200 flex items-center px-2.5 p-2 space-x-1.5 text-sm  rounded">
              <div className=" flex items-center gap-1 font-medium text-heading text-slate-600">
                Search Results....
              </div>
            </div>
          </div>
          <ul className="px-2 pb-2 text-sm text-body max-h-50 font-medium overflow-y-scroll">
            {data?.map((item, i) => (
              <li key={i} className="border-b border-gray-100">
                <Link
                  href={`/products?search=${item.name}`}
                  onClick={() => {
                    setOpen(true);
                    setSearchInput("");
                  }}
                  className="inline-flex gap-1 items-center w-full p-2 hover:bg-gray-100 hover:text-gray-950 text-gray-500 rounded cursor-pointer"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {!open ? (
        <div
          className="  w-screen h-screen min-h-5000 min-w-5000 top-12 bg-transparent  fixed "
          onClick={() => setOpen(true)}
        ></div>
      ) : (
        ""
      )}
    </>
  );
};

export default SearchResults;
