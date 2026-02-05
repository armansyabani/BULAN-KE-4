import { useMemo, useCallback } from "react";
import { useProducts } from "../hooks/useProducts";

const Dashboard = () => {
  // 1️⃣ Ambil data dari context
  const { products, deleteProduct } = useProducts();

  // 2️⃣ useMemo → HITUNG DATA
  const totalProducts = useMemo(() => {
    return products.length;
  }, [products]);

  // 3️⃣ useCallback → EVENT HANDLER
  const handleDelete = useCallback(
    (id: number) => {
      deleteProduct(id);
    },
    [deleteProduct]
  );

  // 4️⃣ Baru return JSX
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
