'use client';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { fetchUsers } from '@/store/userSlice';

const Main: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data, loading, error } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div>
      <h1>Danh sách người dùng</h1>
      {loading && <p>Đang tải...</p>}
      {error && <p>Có lỗi xảy ra: {error}</p>}
      {!loading && !error && (
        <ul>
          {data.map((user) => (
            <li key={user.id}>
              {user.name} (ID: {user.id})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Main;
