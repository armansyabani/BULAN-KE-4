import React, { useEffect, useState } from "react";
import axios from "axios";

type RawUser = {
  id: number;
  name: string;
  email: string;
  address: {
    city: string;
  };
};

type ProcessedUser = {
  id: number;
  name: string;
  email: string;
  city: string;
};

function getErrorMessage(err: unknown) {
  if (axios.isAxiosError(err)) return err.message;
  if (err instanceof Error) return err.message;
  return String(err);
}

export default function UserListManipulated() {
  const [users, setUsers] = useState<ProcessedUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get<RawUser[]>("https://jsonplaceholder.typicode.com/users");

        const processed = res.data
          .map((u) => ({
            id: u.id,
            name: u.name,
            email: u.email,
            city: u.address.city, // nested
          }))
          .filter((u) => u.city === "Gwenborough"); // filter contoh

        if (!ignore) setUsers(processed);
      } catch (err) {
        if (!ignore) setError(getErrorMessage(err));
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchUsers();

    return () => {
      ignore = true;
    };
  }, []);

  if (loading) return <p>Memuat daftar pengguna...</p>;
  if (error) return <p>Terjadi kesalahan: {error}</p>;
  if (users.length === 0) return <p>Tidak ada user yang cocok dengan filter.</p>;

  return (
    <div>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            <strong>{u.name}</strong> ({u.email}) - {u.city}
          </li>
        ))}
      </ul>
    </div>
  );
}
