import { configureStore } from '@reduxjs/toolkit';
import ghostsReducer from '@store/ghostSlice';
import characterReducer from '@store/selectedGhostSlice';
import userIdReducer from '@store/userSlice';

export const store = configureStore({
  reducer: {
    ghosts: ghostsReducer,
    selectedGhost: characterReducer,
    userId: userIdReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
