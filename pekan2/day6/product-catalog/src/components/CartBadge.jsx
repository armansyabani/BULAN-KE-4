import { useCart } from "../context/CartContext";

export default function CartBadge() {
  const { totalItems } = useCart();

  return (
    <div className="cartBadge" aria-label="Cart items">
      🛒 <span className="cartCount">{totalItems}</span>
    </div>
  );
}
