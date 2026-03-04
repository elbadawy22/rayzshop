"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { CartItem } from "../lib/taypes";

type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removequantity: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored && stored?.length > 0) {
      setItems(JSON.parse(stored));
    }
  }, []);

  // sync to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);

      if (exists) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };
  const removequantity = (item: CartItem) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);

      if (exists && exists.quantity > 1) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i,
        );
      }
      return [...prev];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, clearCart, removequantity }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return ctx;
};
