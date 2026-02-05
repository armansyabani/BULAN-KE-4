import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import Navbar from "./components/Navbar";

import { AuthProvider } from "./contexts/AuthContext";
import { ProductProvider } from "./contexts/ProductContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CartProvider } from "./contexts/CartContext";

import { useAuth } from "./hooks/useAuth";

/* =========================
   PRIVATE ROUTE
========================= */
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuth } = useAuth();
  return isAuth ? <>{children}</> : <Navigate to="/login" />;
};

/* =========================
   APP
========================= */
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <BrowserRouter>
              <Navbar />

              <Routes>
                <Route path="/" element={<Navigate to="/products" />} />

                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />

                <Route path="/login" element={<Login />} />

                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
