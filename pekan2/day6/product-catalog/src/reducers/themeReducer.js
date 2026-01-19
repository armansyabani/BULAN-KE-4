export const initialThemeState = {
  theme: "light", // "light" | "dark"
};

export function themeReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_THEME":
      return { theme: state.theme === "light" ? "dark" : "light" };
    case "SET_THEME":
      return { theme: action.payload === "dark" ? "dark" : "light" };
    default:
      return state;
  }
}
