export const initialCartState = {
  items: [], // [{id, title, price, image, qty}]
};

export function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const product = action.payload;
      const existing = state.items.find((it) => it.id === product.id);

      if (existing) {
        return {
          ...state,
          items: state.items.map((it) =>
            it.id === product.id ? { ...it, qty: it.qty + 1 } : it
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { ...product, qty: 1 }],
      };
    }

    case "REMOVE_ITEM": {
      const id = action.payload;
      const existing = state.items.find((it) => it.id === id);
      if (!existing) return state;

      if (existing.qty === 1) {
        return { ...state, items: state.items.filter((it) => it.id !== id) };
      }

      return {
        ...state,
        items: state.items.map((it) =>
          it.id === id ? { ...it, qty: it.qty - 1 } : it
        ),
      };
    }

    case "CLEAR_CART":
      return { ...state, items: [] };

    default:
      return state;
  }
}
