// src/components/UserList.tsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '../app/store';
import { fetchUsers } from '../user/userSlice';

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
const useAppDispatch = () => useDispatch<AppDispatch>();

const UserList: React.FC = () => {
  const users = useAppSelector((state) => state.users.list);
  const status = useAppSelector((state) => state.users.status);
  const error = useAppSelector((state) => state.users.error);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Memuat pengguna...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Daftar Pengguna</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} ({user.email})</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;