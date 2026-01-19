import { createContext, useContext, useMemo, useReducer } from "react";
import { cartReducer, initialCartState } from "../reducers/cartReducer";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  const totalItems = state.items.reduce((sum, it) => sum + it.qty, 0);

  const value = useMemo(() => {
    return {
      items: state.items,
      totalItems,
      addItem: (product) => dispatch({ type: "ADD_ITEM", payload: product }),
      removeItem: (id) => dispatch({ type: "REMOVE_ITEM", payload: id }),
      clearCart: () => dispatch({ type: "CLEAR_CART" }),
    };
  }, [state.items, totalItems]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
