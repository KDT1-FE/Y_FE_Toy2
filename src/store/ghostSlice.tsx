import { createSlice } from '@reduxjs/toolkit';

const getGhosts = createSlice({
  name: 'ghosts',
  initialState: [] as ghost,
  reducers: {
    getCharacters: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { getCharacters } = getGhosts.actions;
export default getGhosts.reducer;

type ghost = Ghost[];

interface Ghost {
  id: string;
  fileUrl: string;
}
