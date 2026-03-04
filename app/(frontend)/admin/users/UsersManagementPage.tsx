"use client";
import { useEffect, useState } from "react";
import { Eye, UserSearch, UserCog, UserPlus, Users, ShieldUser, UserPen, UserCheck } from "lucide-react";
import Link from "next/link";
import { getUsers } from "../../lib/services/client/users.services";
import { UsersDots } from "../../lib/taypes";
import UsersCharts from "../components/UsersCharts";
interface ChartsUsersData {
  totalUsers: number;
  guests: number;
  customers: number;
  admins: number;
  productsMang: number;
  ordersMang: number;
}
export default function UsersManagementPage() {
  const [filteredUsers, setFilteredUserss] = useState<UsersDots[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchRole, setSearchRole] = useState("");
  const [count, setCount] = useState<number>(0);
  const [pageNumData, setPageNumData] = useState<number>(0);
  const [pageNum, setPageNum] = useState(1);
  const [charts, setCharts] = useState<ChartsUsersData>();

  useEffect(() => {
    getUsers(searchQuery, searchRole, pageNum)
      .then((res) => res.json())
      .then((res) => {
        setFilteredUserss(res.users);
        setCount(res.count);
        setPageNum(res.page);
        setPageNumData(res.countPagn);
        setCharts(res.chart);
      })
      .catch((err) => console.log(err?.message));
  }, [searchQuery, searchRole, pageNum]);

  return (
    <div className="p-6  bg-g h-screen ">

      {/* Stats Cards */}
      <UsersCharts charts={charts} />

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 ">
          <Link
            href="users/create"
            className="max-w-50 bg-blue-500 hover:bg-blue-600 rounded flex justify-center items-center  "
          >
            <span className="pl-2 md:py-0 py-2 w-full text-sm text-gray-50">
              Add New user
            </span>
            <div className="px-2 md:pr-1">
              <UserPlus className="  transform   w-5 text-gray-50" />
            </div>
          </Link>
          <div className=" flex-1">
            <div className=" flex  items-center    ">
              <div className="shadow bg-blue-500 border border-gray-300 rounded-l-lg  pl-2  p-1 ">
                <UserSearch className="   transform   w-5 text-gray-50" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPageNum(1);
                }}
                placeholder="Search by Name  or Phone..."
                className=" shadow border-l border-l-white border  pr-4 p-1 border-gray-300 rounded-r-lg w-full focus:outline-none focus:ring  focus:ring-blue-500"
              />
            </div>
          </div>
          <div className=" grid grid-cols-1">
            <select
              id="role"
              name="role"
              autoComplete="role-name"
              className="shadow p-1  outline-gray-300 col-start-1 row-start-1 w-full appearance-none rounded-md   pr-8 pl-3 text-base text-gray-600 outline-1 -outline-offset-1  *:bg-gray-200 *:rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm/6"
              onChange={(e) => {
                setSearchRole(e.target.value);
                setPageNum(1);
              }}
            >
              <option value="">All Roles</option>
              <option value="ADMIN" className="text-black">
                Admin
              </option>
              <option value="PRODUCTS_MANAGER" className="text-black">
                Products Manager
              </option>
              <option value="ORDER_MANAGER" className="text-black">
                Orders Manager
              </option>
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
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden ">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Name
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  E-mail
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Phone
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Created At
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Role
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Detalies
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers?.map((user) => (
                <tr
                  key={user.id}
                  className="buser-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4 font-semibold">{user.email}</td>
                  <td className="py-3 px-4 text-gray-600">{user.phone}</td>
                  <td className="py-3 px-4 text-gray-600">
                    <span>
                      {user.createdAt.split("T")[0].split("-")[2]}/
                      {user.createdAt.split("T")[0].split("-")[1]}/
                      {user.createdAt.split("T")[0].split("-")[0]}
                    </span>
                    {" @ "}
                    <span>{user.createdAt.split("T")[1].slice(0, 5)}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        user.role === "ORDER_MANAGER"
                          ? "bg-green-100 text-green-700"
                          : user.role === "ADMIN"
                            ? "bg-red-100 text-red-700"
                            : user.role === "PRODUCTS_MANAGER"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600  ">
                    <Link
                      href={`users/${user.id}`}
                      className="hover:bg-blue-200 w-full"
                    >
                      <Eye className="transform w-5 text-blue-500 hover:bg-blue-200 " />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            {/* Showing {filteredUsers.length} of  orders.length orders */}
          </p>

          <div className="flex ">
            <button
              hidden={pageNum <= 1}
              className="px-3  py-1 cursor-pointer border border-gray-300 rounded hover:bg-gray-50"
              onClick={(e) => setPageNum(pageNum - 1)}
            >
              Previous...
            </button>
            {Array.from({ length: Math.ceil(count / pageNumData) })?.map(
              (_, i) => (
                <div key={i}>
                  {i + 1 <= pageNum + 1 && i + 1 >= pageNum - 1 ? (
                    <button
                      value={i + 1}
                      className={`px-3 mx-1 py-1 ${pageNum == i + 1 ? "bg-blue-600 text-white" : "border border-gray-300 rounded hover:bg-gray-50"} cursor-pointer   rounded`}
                      onClick={() => {
                        setPageNum(i + 1);
                      }}
                    >
                      {i + 1}
                    </button>
                  ) : null}
                </div>
              ),
            )}
            <button
              hidden={
                pageNum >= parseInt(Math.ceil(count / pageNumData).toString())
              }
              className="px-3 cursor-pointer py-1 border border-gray-300 rounded hover:bg-gray-50"
              onClick={(e) => setPageNum(pageNum + 1)}
            >
              ...Next
            </button>
          </div>
        </div>
      </div>
      <div className="mt-15 w-full h-5"></div>
    </div>
  );
}
