"use client";

import { toast } from "react-toastify";
import { Products } from "../../lib/taypes";
import { useCart } from "../../providers/CartProvider";

const AddCartBtn = ({ product }: { product: Products }) => {
  const { addItem } = useCart();
  const handelCart = (res: Products) => {
    addItem({ ...res, quantity: 1 });
    toast.success("Added Successfully");
  };
  return (
    <>
      {product.stock > 0 ? (
        <button
          onClick={() => handelCart(product)}
          className="hover:from-blue-600 hover:to-blue-600  font-bold  cursor-pointer grow text-gray-50 text-sm p-2 bg-linear-to-r from-purple-600 to-blue-600  "
        >
          Add To Cart
        </button>
      ) : (
        <button
          className="     grow text-red-700 text-sm border-t border-gray-300 pt-2  "
        >
          Out of Stock
        </button>
      )}
    </>
  );
};

export default AddCartBtn;
