import { createSlice } from '@reduxjs/toolkit';

export const getUser = createSlice({
  name: 'getUserInfo',
  initialState: {},
  reducers: {
    getUserInfo: (_, action) => {
      return action.payload;
    },
  },
});

export const { getUserInfo } = getUser.actions;
export default getUser.reducer;
