import { configureStore } from '@reduxjs/toolkit';
import ghostsReducer from './ghostSlice';
import characterReducer from './selectedGhostSlice';

export const store = configureStore({
  reducer: {
    ghosts: ghostsReducer,
    selectedGhost: characterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
