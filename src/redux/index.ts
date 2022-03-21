import { configureStore } from '@reduxjs/toolkit';
import testReducer from './reducer/test';

export const store = configureStore({
  reducer: {
    test: testReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
