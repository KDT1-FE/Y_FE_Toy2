import { createSlice } from "@reduxjs/toolkit";

const getGhosts = createSlice({
  name: "ghosts",
  initialState: [],
  reducers: {
    getCharacters: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { getCharacters } = getGhosts.actions;
export default getGhosts.reducer;
