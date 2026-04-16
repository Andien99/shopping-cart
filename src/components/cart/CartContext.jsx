import { createContext, useContext } from "react";

export const CartContext = createContext(null);

export function useCart() {
  const context = useContext(CartContext);

  if (context === null || context == undefined) {
    throw new Error("Error: useCart must be used within CartContext provider");
  }
  return context;
}
