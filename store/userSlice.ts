
// store/userSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
  id: number;
  name: string;
}

interface UserState {
  data: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: [],
  loading: false,
  error: null,
};


export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
   async () => {
  const response = await axios.get('http://localhost:3001/users');
  return response.data;
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Không tìm thấy User'; // Cần thêm dòng này để lưu trữ lỗi
      });
  }
  
});

export default userSlice.reducer;
