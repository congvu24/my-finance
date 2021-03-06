import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    loading: false,
  },
  reducers: {
    onLoading(state) {
      state.loading = true;
    },
    offLoading(state) {
      state.loading = false;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { offLoading, setLoading, onLoading } = appSlice.actions;
export default appSlice.reducer;
