import { configureStore } from '@reduxjs/toolkit';
import auth from './auth';
import items from './items';
import basket from './basket';
export const store = configureStore({
  reducer: {
    auth,
    items,
    basket,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
