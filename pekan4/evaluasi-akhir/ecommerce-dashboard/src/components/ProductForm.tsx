import { ProductCard } from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";
import { ErrorBoundary } from "../components/ErrorBoundary";

const Products = () => {
  const { products, loading, error } = useProducts();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ErrorBoundary>
      <h2>Product List</h2>
      {products.map(p => (
        <ProductCard key={p.id} product={p} />
      ))}
    </ErrorBoundary>
  );
};

export default Products;
