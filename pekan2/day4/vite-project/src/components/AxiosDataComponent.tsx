import React, { useEffect, useState } from "react";
import axios from "axios";

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

function getErrorMessage(err: unknown) {
  if (axios.isAxiosError(err)) {
    // Bisa ambil status / message lebih detail
    const status = err.response?.status;
    const msg = err.message;
    return status ? `HTTP ${status}: ${msg}` : msg;
  }
  if (err instanceof Error) return err.message;
  return String(err);
}

export default function AxiosDataComponent() {
  const [data, setData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    const fetchUser = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get<User>("https://jsonplaceholder.typicode.com/users/1");
        if (!ignore) setData(res.data);
      } catch (err) {
        if (!ignore) setError(getErrorMessage(err));
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchUser();

    return () => {
      ignore = true;
    };
  }, []);

  if (loading) return <p>Memuat data user...</p>;
  if (error) return <p>Terjadi kesalahan: {error}</p>;
  if (!data) return <p>Data kosong.</p>;

  return (
    <div>
      <h3>{data.name}</h3>
      <p>Email: {data.email}</p>
      <p>Telepon: {data.phone}</p>
    </div>
  );
}
