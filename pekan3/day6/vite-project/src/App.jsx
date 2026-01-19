import { Routes, Route, Navigate, NavLink, useLocation } from "react-router-dom";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import { useAuth } from "./contexts/AuthContext";

/* =========================
   PRIVATE ROUTE
========================= */
const PrivateRoute = ({ children }) => {
  const { isAuth } = useAuth();
  const location = useLocation();

  // kalau belum login → lempar ke /login
  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

/* =========================
   APP
========================= */
function App() {
  const { isAuth, logout } = useAuth();

  return (
    <>
      {/* ===== NAVBAR ===== */}
      <nav>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/cart">Cart</NavLink>
        <NavLink to="/checkout">Checkout</NavLink>

        {/* AUTH BUTTON */}
        <div style={{ marginLeft: "auto" }}>
          {isAuth ? (
            <button className="nav-btn" onClick={logout}>
              Logout
            </button>
          ) : (
            <NavLink to="/login" className="nav-btn">
              Login
            </NavLink>
          )}
        </div>
      </nav>

      {/* ===== ROUTES ===== */}
      <Routes>
        {/* default */}
        <Route path="/" element={<Navigate to="/products" replace />} />

        {/* public routes */}
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />

        {/* private route */}
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />

        {/* fallback */}
        <Route path="*" element={<h2 style={{ padding: 40 }}>404 - Page Not Found</h2>} />
      </Routes>
    </>
  );
}

export default App;
