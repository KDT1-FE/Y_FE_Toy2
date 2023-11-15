import { createSlice } from '@reduxjs/toolkit';

export const selectedGhost = createSlice({
  name: 'selectedGhost',
  initialState: '',
  reducers: {
    setCharacter: (_, action) => {
      return action.payload;
    },
  },
});

export const { setCharacter } = selectedGhost.actions;
export default selectedGhost.reducer;
