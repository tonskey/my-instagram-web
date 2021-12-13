import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '@/store';

export type AuthState = {
  token: string | undefined;
  email: string | undefined;
};

const initialState: AuthState = {
  token: undefined,
  email: undefined,
};

export const authSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    authUser: (state, action: PayloadAction<{ token: string; email: string }>) => {
      state.token = action.payload.token;
      state.email = action.payload.email;
    },
    logout: (state) => {
      state.token = undefined;
      state.email = undefined;
    },
  },
});

export const tokenSelector = (state: RootState) => state.auth.token;
export const emailSelector = (state: RootState) => state.auth.email;

export const { authUser, logout } = authSlice.actions;

export const { reducer } = authSlice;
