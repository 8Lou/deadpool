import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
type AuthStateType = {
  isAuth: boolean;
  login: string;
};
const initialState: AuthStateType = {
  isAuth: false,
  login: '',
};

export const counterSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    isAuthTrue: (state, action: PayloadAction<string | undefined>) => {
      state.isAuth = true;
      state.login = action.payload ?? 'unknown';
    },
    isAuthFalse: (state) => {
      state.isAuth = false;
      state.login = '';
    },
  },
});

export const { isAuthTrue, isAuthFalse } = counterSlice.actions;
export default counterSlice.reducer;
