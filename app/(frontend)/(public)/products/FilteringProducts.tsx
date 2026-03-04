"use client";
import { SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const FilteringProducts = () => {
  const router = useRouter();
  const path = useSearchParams();
  const query = new URLSearchParams();
  const minPriceVal = path.get("minPrice") || "" as string;
  const maxPriceVal = path.get("maxPrice") || "" as string;
  const priceOrderVal = path.get("priceOrder") || "" as string;

  const handelFilterAction = (e: FormData) => {
    const minPrice = e.get("minPrice") as string;
    const maxPrice = e.get("maxPrice") as string;
    const priceOrder = e.get("priceOrder") as string;
    if (minPrice !== "") {
      query.delete("minPrice");
      query.append("minPrice", minPrice);
    } else {
      query.delete("minPrice");
    }
    if (maxPrice !== "") {
      query.delete("maxPrice");
      query.append("maxPrice", maxPrice);
    } else {
      query.delete("maxPrice");
    }
    if (priceOrder !== "") {
      query.delete("priceOrder");
      query.append("priceOrder", priceOrder);
    } else {
      query.delete("priceOrder");
    }
    router.push(`products?${query.toString()}`);
  };
  return (
    <form action={handelFilterAction} className="pb-3 px-3 flex flex-col   ">
      <div className="flex gap-1">
        <h3>Products Filtering</h3>
        <SlidersHorizontal className="w-4 text-gray-700" />
      </div>
      <div className="flex md:flex-col gap-2 pt-2 px-2 w-full  border-b border-gray-300 py-3 ">
        <input
          type="text"
          name="minPrice"
          placeholder="Min Price"
          className="border w-23 text-sm md:w-full shadow border-gray-300 rounded px-2 outline-none focus:border-blue-500 focus:shadow-blue-500  "
          defaultValue={minPriceVal}
        />
        <input
          type="text"
          name="maxPrice"
          placeholder="Max Price"
          className="border text-sm shadow w-23 md:w-full border-gray-300 rounded px-2 outline-none focus:border-blue-500 focus:shadow-blue-500  "
          defaultValue={maxPriceVal}
        />
        <select
          name="priceOrder"
          className="border shadow w-17 text-sm md:w-full text-gray-400 border-gray-300 rounded px-2 outline-none focus:border-blue-500 focus:shadow-blue-500  "
          defaultValue={priceOrderVal}
        >
          <option value="" className="text-gray-300">
            Order Price
          </option>
          <option value="asc" className="text-gray-600">
            From Low
          </option>
          <option value="desc" className="text-gray-600">
            From High
          </option>
        </select>
        <div className="flex gap-1 md:flex-col ">
          <button
            type="submit"
            className="flex items-center justify-center  cursor-pointer  w-8  text-xs md:w-full hover:bg-blue-600 text-gray-50 bg-blue-500 rounded   "
          >
            Filter
          </button>
          <Link
            href="/products"
            className="flex items-center justify-center  cursor-pointer w-8  text-xs md:w-full hover:bg-blue-600 text-gray-50 bg-blue-500 rounded   "
          >
            Reset
          </Link>
        </div>
      </div>
    </form>
  );
};

export default FilteringProducts;
