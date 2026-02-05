import { Link } from "react-router-dom";
import { Product } from "../contexts/ProductContext";
import { useCart } from "../hooks/useCart";

export const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      <h4>{product.title}</h4>
      <p className="price">${product.price}</p>

      <div className="actions">
        <Link to={`/products/${product.id}`}>Detail</Link>
        <button onClick={() => addToCart(product)}>Beli</button>
      </div>
    </div>
  );
};
