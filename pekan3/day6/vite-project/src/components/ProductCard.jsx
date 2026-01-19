import useCart from "../hooks/useCart";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>${product.price}</p>

      <div className="card-btn">
        <button onClick={() => addToCart(product)}>Add to Cart</button>
        <Link to={`/products/${product.id}`}>Detail</Link>
      </div>
    </div>
  );
};

export default ProductCard;
