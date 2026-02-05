import { useMemo, useCallback } from "react";
import { useProducts } from "../hooks/useProducts";

const Dashboard = () => {
  const { products, deleteProduct } = useProducts();

  // ✅ useMemo
  const totalProducts = useMemo(() => {
    console.log("Hitung total produk");
    return products.length;
  }, [products]);

  // ✅ useCallback
  const handleDelete = useCallback(
    (id: number) => {
      deleteProduct(id);
    },
    [deleteProduct]
  );

  return (
    <>
      <h2>Dashboard Admin</h2>
      <p>Total Produk: {totalProducts}</p>

      {products.map(p => (
        <div key={p.id}>
          {p.title}
          <button onClick={() => handleDelete(p.id)}>Delete</button>
        </div>
      ))}
    </>
  );
};

export default Dashboard;
