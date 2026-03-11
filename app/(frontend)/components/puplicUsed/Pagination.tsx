import Link from "next/link";

export default function Pagination({count,page,countPagn}:{count: number ,page: number,countPagn:number}) {

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
      <p className="text-sm text-gray-600">
        {/* Showing {filteredUsers.length} of  orders.length orders */}
      </p>

      <div className="flex ">
        {Array.from({ length: Math.ceil(count / countPagn) })?.map((_, i) => (
          <Link href={`?pageNumber=${i+1}`} key={i}>
            {i + 1 <= page + 1 && i + 1 >= page - 1 ? (
              <button
                value={i + 1}
                className={`px-3 mx-1 py-1 ${page == i + 1 ? "bg-blue-600 text-white" : "border border-gray-300 rounded hover:bg-gray-50"} cursor-pointer   rounded`}
              >
                {i + 1}
              </button>
            ) : null}
          </Link>
        ))}
      </div>
    </div>
  );
}
