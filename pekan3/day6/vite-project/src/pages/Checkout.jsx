import useCart from "../hooks/useCart";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, totalPrice } = useCart();
  const navigate = useNavigate();

  const handlePay = () => {
    alert("Payment success 🎉");
    navigate("/products");
  };

  if (cart.length === 0) {
    return (
      <div className="container">
        <h2>Checkout</h2>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Checkout</h2>

      {/* LIST PRODUCT */}
      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <span>{item.title}</span>
          <strong>${item.price}</strong>
        </div>
      ))}

      {/* TOTAL */}
      <h3 style={{ marginTop: 20 }}>
        Total: ${totalPrice.toFixed(2)}
      </h3>

      <button
        style={{ marginTop: 20 }}
        onClick={handlePay}
      >
        Pay Now
      </button>
    </div>
  );
};

export default Checkout;
