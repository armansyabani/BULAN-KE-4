import { createContext, useState, ReactNode, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "../hooks/useCart";

const Navbar = () => {
  const { cart } = useCart();

  return (
    <nav>
      <NavLink to="/products">Products</NavLink>
      <span>🛒 Cart: {cart.length}</span>
    </nav>
  );
};

export default Navbar;

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    document.body.className = theme; // 🔥 INI KUNCI
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
