import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";
import { useEffect } from "react";

const Navbar = () => {
  const { isAuth, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    console.log("Theme sekarang:", theme); // 🔥 DEBUG
    document.body.className = theme;
  }, [theme]);

  return (
    <nav style={{ padding: 16 }}>
      <NavLink to="/products">Products</NavLink>{" "}
      {isAuth && <NavLink to="/dashboard">Dashboard</NavLink>}{" "}
      <button onClick={toggleTheme}>
        {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
      </button>{" "}
      {isAuth ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <NavLink to="/login">Login</NavLink>
      )}
    </nav>
  );
};

export default Navbar;
