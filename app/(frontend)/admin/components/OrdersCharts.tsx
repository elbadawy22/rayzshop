import { Ban, ListOrdered, Loader, MapPinCheck, PackageCheck } from "lucide-react";

interface ChartsOrders {
  PENDING: number;
  CONFIRMED: number;
  DELIVERED: number;
  CANCELED: number;
}
export default function OrdersCharts({
  charts,count
}: {
  charts: ChartsOrders | undefined;
  count:number |undefined
}) {
  return (
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-gray-600 text-sm mb-1 flex gap-1 items-center">
            <ListOrdered className="w-5 text-slate-700" /> Total Orders{" "}
          </p>
          <p className="text-2xl font-bold  ">{count || 0} </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-gray-600 text-sm mb-1 flex gap-1 items-center">
            {" "}
            <Loader className="w-5 text-yellow-600" /> PENDING
          </p>
          <p className="text-2xl font-bold text-yellow-600  ">
            {charts?.PENDING || 0}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-gray-600 text-sm mb-1 flex gap-1 items-center">
            <PackageCheck className="w-5 text-blue-600" /> CONFIRMED
          </p>
          <p className="text-2xl font-bold text-blue-600 ">
            {charts?.CONFIRMED || 0}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-gray-600 text-sm mb-1 flex gap-1 items-center">
            {" "}
            <MapPinCheck className="w-5 text-green-600" /> DELIVERED
          </p>
          <p className="text-2xl font-bold text-green-600 ">
            {charts?.DELIVERED || 0}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-gray-600 text-sm mb-1 flex gap-1 items-center">
            {" "}
            <Ban className="w-5 text-red-500 " /> CANCELED
          </p>
          <p className="text-2xl font-bold  text-red-500">
            {charts?.CANCELED || 0}
          </p>
        </div>
      </div>
  );
}
