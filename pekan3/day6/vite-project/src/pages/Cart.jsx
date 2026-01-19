import useCart from "../hooks/useCart";
import ErrorBoundary from "../components/ErrorBoundary";

const Cart = () => {
  const { cart, removeFromCart, totalPrice } = useCart();

  return (
    <ErrorBoundary>
      <div className="container">
        <h2>Shopping Cart</h2>
        {cart.length === 0 && <p>Cart is empty</p>}

        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <span>{item.title}</span>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        ))}

        <h3>Total: ${totalPrice.toFixed(2)}</h3>
      </div>
    </ErrorBoundary>
  );
};

export default Cart;
