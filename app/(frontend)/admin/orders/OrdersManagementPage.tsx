"use client";
import { useEffect, useState } from "react";
import {
  Eye,
  ListOrdered,
  Loader,
  PackageCheck,
  MapPinCheck,
  Ban,
  ClipboardPlus,
  Search,
} from "lucide-react";
import Link from "next/link";
import { Orders } from "../../lib/taypes";
import { getorders } from "../../lib/services/client/orders.services";
import OrdersCharts from "../components/OrdersCharts";
interface ChartsUsersData {
  PENDING: number;
  CONFIRMED: number;
  DELIVERED: number;
  CANCELED: number;
}
export default function UsersManagementPage() {
  const [filteredUsers, setFilteredUsers] = useState<Orders[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [count, setCount] = useState<number>(0);
  const [pageNumData, setPageNumData] = useState<number>(0);
  const [pageNum, setPageNum] = useState(1);
  const [charts, setCharts] = useState<ChartsUsersData>();
  const [searchCat, setSearchCat] = useState<boolean>(true);

  useEffect(() => {
    getorders(searchQuery, searchStatus, pageNum,searchCat)
      .then((res) => res.json())
      .then((res) => {
        setFilteredUsers(res.data);
        setCount(res.count);
        setPageNum(res.page);
        setPageNumData(res.countPagn);
        setCharts(res.charts);
      })
      .catch((err) => console.log(err?.message));
  }, [searchQuery, searchStatus, pageNum]);

  return (
    <div className="p-6  bg-g h-screen ">
      {/* Header */}
      {/* <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2 flex items-center gap-1"><UserCog/> Users Management</h1>
        <p className="text-gray-600">Track and manage users</p>
      </div> */}
      {/* Stats Cards */}
        <OrdersCharts charts={charts} count={count} />

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 ">
          <div
            className="max-w-50 cursor-pointer bg-blue-500 hover:bg-blue-600 rounded flex justify-center items-center  "
            onClick={() => setSearchCat(!searchCat)}
          >
            <span className=" font-bold pl-2 md:py-0 py-2 w-full text-sm px-2 text-gray-50">
              {searchCat ? "Users" : "Guests"}
            </span>
          </div>
          <div className=" flex-1">
            <div className=" flex  items-center    ">
              <div className="shadow bg-blue-500 border border-gray-300 rounded-l-lg  pl-2  p-1 ">
                <Search className="   transform   w-5 text-gray-50" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPageNum(1);
                }}
                placeholder={`Search by Phone ${searchCat ? "Users" : "Guests"}...`}
                className=" shadow border-l border-l-white border  pr-4 p-1 border-gray-300 rounded-r-lg w-full focus:outline-none focus:ring  focus:ring-blue-500"
              />
            </div>
          </div>
          <div className=" grid grid-cols-1">
            <select
              id="status"
              name="status"
              autoComplete="status-name"
              className="shadow p-1  outline-gray-300 col-start-1 row-start-1 w-full appearance-none rounded-md   pr-8 pl-3 text-base text-gray-600 outline-1 -outline-offset-1  *:bg-gray-200 *:rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm/6"
              onChange={(e) => {
                setSearchStatus(e.target.value);
                setPageNum(1);
              }}
            >
              <option value="">All Status</option>
              <option value="PENDING" className="text-black">
                Pending
              </option>
              <option value="CONFIRMED" className="text-black">
                Confirmed
              </option>
              <option value="DELIVERED" className="text-black">
                Delivered
              </option>
              <option value="CANCELED" className="text-black">
                Canceled
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
                  Status
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Detalies
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers?.map((order) => (
                <tr
                  key={order.id}
                  className="buser-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4">
                    {order.user?.name || order.guestOrderInfo?.name}
                  </td>
                  <td className="py-3 px-4 font-semibold">
                    {order.user?.email || "Guests Customers"}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {order.user?.phone || order.guestOrderInfo?.phone}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    <span>
                      {order.createdAt.split("T")[0].split("-")[2]}/
                      {order.createdAt.split("T")[0].split("-")[1]}/
                      {order.createdAt.split("T")[0].split("-")[0]}
                    </span>
                    {" @ "}
                    <span>{order.createdAt.split("T")[1].slice(0, 5)}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        order.status === "DELIVERED"
                          ? "bg-green-100 text-green-700"
                          : order.status === "CANCELED"
                            ? "bg-red-100 text-red-700"
                            : order.status === "PENDING"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600  ">
                    <Link
                      href={`orders/${order.id}`}
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
