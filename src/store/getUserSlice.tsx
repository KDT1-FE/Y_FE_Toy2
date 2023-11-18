import { createSlice } from '@reduxjs/toolkit';

export const getUser = createSlice({
  name: 'getUserInfo',
  initialState: { user: {} as User },
  reducers: {
    getUserInfo: (_, action) => {
      return action.payload;
    },
  },
});

export const { getUserInfo } = getUser.actions;
export default getUser.reducer;

interface User {
  id: string;
  password: string;
  name: string;
  picture: string;
  chats: string[];
}
