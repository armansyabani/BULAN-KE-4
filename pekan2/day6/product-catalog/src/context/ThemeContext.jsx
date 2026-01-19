import { createContext, useContext, useMemo, useReducer } from "react";
import { initialThemeState, themeReducer } from "../reducers/themeReducer";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [state, dispatch] = useReducer(themeReducer, initialThemeState);

  const value = useMemo(() => {
    return {
      theme: state.theme,
      toggleTheme: () => dispatch({ type: "TOGGLE_THEME" }),
      setTheme: (t) => dispatch({ type: "SET_THEME", payload: t }),
    };
  }, [state.theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
