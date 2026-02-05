import "../App.css";
import { useState, useMemo } from "react";
import { useProducts } from "../hooks/useProducts";
import { ProductCard } from "../components/ProductCard";

const Products = () => {
  const { products, loading, error } = useProducts();
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  if (loading) return <p className="page">Loading...</p>;
  if (error) return <p className="page">{error}</p>;

  return (
    <div className="page">
      <h1>🛒 Product Catalog</h1>
      <p>Kumpulan produk yang tersedia</p>

      <input
        className="search-input"
        placeholder="Cari produk..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className="product-grid">
        {filteredProducts.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default Products;
