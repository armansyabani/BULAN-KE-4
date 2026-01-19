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

export default function AbortFetchComponent() {
  const [data, setData] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/1", { signal });
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

        const result: Post = await response.json();
        if (!signal.aborted) setData(result);
      } catch (err) {
        // Kalau abort, jangan anggap error
        if (err instanceof DOMException && err.name === "AbortError") return;
        if (!signal.aborted) setError(getErrorMessage(err));
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort(); // cleanup saat unmount
    };
  }, []);

  if (loading) return <p>Memuat data (dengan AbortController)...</p>;
  if (error) return <p>Terjadi kesalahan: {error}</p>;
  if (!data) return <p>Data kosong.</p>;

  return (
    <div>
      <h3>{data.title}</h3>
      <p>{data.body}</p>
    </div>
  );
}
