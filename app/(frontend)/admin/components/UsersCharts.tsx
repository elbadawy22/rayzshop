import { ShieldUser, UserCheck, UserPen, Users } from "lucide-react";
import React from "react";

interface ChartsUsers {
  totalUsers: number;
  customers: number;
  guests: number;
  admins: number;
  ordersMang: number;
  productsMang: number;
}
export default function UsersCharts({
  charts,
}: {
  charts: ChartsUsers | undefined;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow-md p-4">
        <p className="text-gray-600 text-sm mb-1 flex gap-1 items-center">
          <Users className="w-5 text-slate-700" /> Total Users{" "}
        </p>
        <p className="text-2xl font-bold  ">{charts?.totalUsers || 0} </p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4">
        <p className="text-gray-600 text-sm mb-1 flex gap-1 items-center">
          {" "}
          Customers
        </p>
        <p className="text-2xl font-bold text-blue-600">
          {charts?.customers || 0}
        </p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4">
        <p className="text-gray-600 text-sm mb-1 flex gap-1 items-center">
          Guests Customers
        </p>
        <p className="text-2xl font-bold text-yellow-600 ">
          {charts?.guests || 0}
        </p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4">
        <p className="text-gray-600 text-sm mb-1 flex gap-1 items-center">
          {" "}
          <ShieldUser className="w-5 text-slate-700" /> Admin
        </p>
        <p className="text-2xl font-bold text-red-500">{charts?.admins || 0}</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4">
        <p className="text-gray-600 text-sm mb-1 flex gap-1 items-center">
          {" "}
          <UserPen className="w-5 text-slate-700" /> Products Manager
        </p>
        <p className="text-2xl font-bold text-green-600">
          {charts?.productsMang || 0}
        </p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4">
        <p className="text-gray-600 text-sm mb-1 flex gap-1 items-center">
          {" "}
          <UserCheck className="w-5 text-slate-700" /> Orders Manager
        </p>
        <p className="text-2xl font-bold text-green-600">
          {charts?.ordersMang || 0}
        </p>
      </div>
    </div>
  );
}
