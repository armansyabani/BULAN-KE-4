import { useParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";

const ProductDetail = () => {
  const { id } = useParams();
  const { products } = useProducts();

  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return <p>Produk tidak ditemukan</p>;
  }

  return (
    <div className="page">
      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} width={200} />
      <p>{product.description}</p>
      <p>
        <strong>Harga:</strong> ${product.price}
      </p>
    </div>
  );
};

export default ProductDetail; // 🔥 INI YANG TADI HILANG
