import { createContext, useState, ReactNode } from "react";
import { Product } from "./ProductContext";

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart(prev => [...prev, product]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
