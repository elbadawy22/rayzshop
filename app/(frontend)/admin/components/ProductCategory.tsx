import {  AlignHorizontalJustifyCenter, FolderKanban } from "lucide-react";


export default function ProductCategory({
  product,category
}: {
  product: number | undefined;
  category:number |undefined
}) {
  return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-gray-600 text-sm mb-1 flex gap-1 items-center">
            <FolderKanban className="w-5 text-slate-700" /> Total Categories{" "}
          </p>
          <p className="text-2xl font-bold  ">{category || 0} </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-gray-600 text-sm mb-1 flex gap-1 items-center">
            <AlignHorizontalJustifyCenter className="w-5 text-slate-700" /> Total Products{" "}
          </p>
          <p className="text-2xl font-bold  ">{product || 0} </p>
        </div>

      </div>
  );
}
