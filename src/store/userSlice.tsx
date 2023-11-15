import { createSlice } from '@reduxjs/toolkit';

export const getUser = createSlice({
  name: 'userID',
  initialState: '',
  reducers: {
    getUserId: (_, action) => {
      return action.payload;
    },
  },
});

export const { getUserId } = getUser.actions;
export default getUser.reducer;
