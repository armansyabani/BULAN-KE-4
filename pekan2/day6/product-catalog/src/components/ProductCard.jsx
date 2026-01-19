import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <div className="card">
      <div className="cardImageWrap">
        <img className="cardImage" src={product.image} alt={product.title} />
      </div>

      <div className="cardBody">
        <h3 className="cardTitle" title={product.title}>
          {product.title}
        </h3>
        <div className="cardMeta">
          <span className="price">${product.price}</span>
        </div>
<button className="button addBtn" onClick={() => addItem(product)}>
  Add to Cart
</button>

      </div>
    </div>
  );
}
