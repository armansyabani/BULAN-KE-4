// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../feature/counter/counterSlice';
import usersReducer from '../user/userSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;