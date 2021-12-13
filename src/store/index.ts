import { configureStore } from '@reduxjs/toolkit';

import { reducer as authReducer } from '@/features/Auth/store';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
