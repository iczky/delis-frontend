import React, { useState } from "react";
import { CartContext } from "./CartContext";
import { CartItem } from "../types/cart";

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existingItem = prev.find((product) => product.id === item.id);
      if (existingItem) {
        return prev.map((product) =>
          product.id === item.id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  const reduceQuantity = (id: number) => {
    setCart((prev) => {
      const existingItem = prev.find((product) => product.id === id);
      if (existingItem && existingItem.quantity > 1) {
        return prev.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        );
      } else {
        return prev.filter((product) => product.id !== id);
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((product) => product.id !== id));
  };

  const removeAllFromCart = () => {
    setCart([]);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        getTotalPrice,
        reduceQuantity,
        removeAllFromCart,
      }}>
      {children}
    </CartContext.Provider>
  );
};
