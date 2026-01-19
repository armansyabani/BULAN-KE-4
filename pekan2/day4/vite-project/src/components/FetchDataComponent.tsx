import React, { useEffect, useState } from "react";

type Post = {
  id: number;
  title: string;
  body: string;
};

function getErrorMessage(err: unknown) {
  if (err instanceof Error) return err.message;
  return String(err);
}

export default function FetchDataComponent() {
  const [data, setData] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");

        // fetch TIDAK auto throw untuk 4xx/5xx, jadi wajib cek response.ok
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const result: Post = await response.json();
        if (!ignore) setData(result);
      } catch (err) {
        if (!ignore) setError(getErrorMessage(err));
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, []);

  if (loading) return <p>Memuat data post...</p>;
  if (error) return <p>Terjadi kesalahan: {error}</p>;
  if (!data) return <p>Data kosong.</p>;

  return (
    <div>
      <h3>{data.title}</h3>
      <p>{data.body}</p>
    </div>
  );
}
