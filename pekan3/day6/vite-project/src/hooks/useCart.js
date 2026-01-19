import { useContext, useMemo, useCallback } from "react";
import { CartContext } from "../contexts/CartContext";

const useCart = () => {
  const { cart, setCart } = useContext(CartContext);

  const addToCart = useCallback((product) => {
    setCart((prev) => [...prev, product]);
  }, [setCart]);

  const removeFromCart = useCallback((id) => {
    setCart((prev) => prev.filter(item => item.id !== id));
  }, [setCart]);

  const totalPrice = useMemo(() => {
    return cart.reduce((total, item) => total + item.price, 0);
  }, [cart]);

  return {
    cart,
    addToCart,
    removeFromCart,
    totalPrice
  };
};

export default useCart;
