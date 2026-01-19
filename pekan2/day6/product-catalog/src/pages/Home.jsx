import { useEffect, useMemo, useState } from "react";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import ProductList from "../components/ProductList";
import CartBadge from "../components/CartBadge";
import { useTheme } from "../context/ThemeContext";

export default function Home() {
  const { theme, toggleTheme } = useTheme();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);       // "Loading..."
  const [error, setError] = useState("");             // "Gagal memuat data"
  const [search, setSearch] = useState("");           // form handling
  const [category, setCategory] = useState("all");    // filter dropdown

  useEffect(() => {
    let cancelled = false;

    async function fetchProducts() {
      setLoading(true);
      setError("");

      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        const data = await res.json();

        if (!cancelled) {
          setProducts(data);
          setLoading(false);
        }
      } catch (e) {
        if (!cancelled) {
          setError("Gagal memuat data.");
          setLoading(false);
        }
      }
    }

    fetchProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return products
      .filter((p) => (category === "all" ? true : p.category === category))
      .filter((p) => (keyword ? p.title.toLowerCase().includes(keyword) : true));
  }, [products, search, category]);

  return (
    <div className={`page ${theme}`}>
      <header className="header">
        <div className="headerLeft">
          <h1 className="title">Product Catalog</h1>
          <p className="subtitle">Fake Store API</p>
        </div>

        <div className="headerRight">
          <CartBadge />
          <button className="button secondary" onClick={toggleTheme}>
            {theme === "light" ? "Dark" : "Light"} Mode
          </button>
        </div>
      </header>

      <section className="toolbar">
        <SearchBar value={search} onChange={setSearch} />
        <CategoryFilter value={category} onChange={setCategory} />
      </section>

      <main className="content">
        {/* Conditional Rendering sesuai soal */}
        {loading && <p className="status">Loading...</p>}

        {!loading && error && <p className="status error">{error}</p>}

        {!loading && !error && filteredProducts.length === 0 && (
          <p className="status">Produk tidak ditemukan.</p>
        )}

        {!loading && !error && filteredProducts.length > 0 && (
          <ProductList products={filteredProducts} />
        )}

        {loading && (
  <>
    <p className="status">Loading...</p>
    <div className="skeletonGrid">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="skeletonCard" />
      ))}
    </div>
  </>
)}

      </main>
    </div>
  );
}
