import { createContext, useEffect, useState, ReactNode } from "react";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  addProduct: (p: Product) => void;
  deleteProduct: (id: number) => void;
}

export const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(setProducts)
      .catch(() => setError("Gagal fetch produk"))
      .finally(() => setLoading(false));
  }, []);

  const addProduct = (product: Product) =>
    setProducts(prev => [...prev, product]);

  const deleteProduct = (id: number) =>
    setProducts(prev => prev.filter(p => p.id !== id));

  return (
    <ProductContext.Provider
      value={{ products, loading, error, addProduct, deleteProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};
