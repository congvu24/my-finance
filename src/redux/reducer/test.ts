import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (userId: Number, thunkApi) => {
    console.log(userId);
    thunkApi.dispatch(setMessage('hi'));
    // const response = await fetch('https://reqres.in/api/users?delay=1');
    return 'response';
  },
);

const testSlice = createSlice({
  name: 'test',
  initialState: {
    message: 'Initial test',
  },
  reducers: {
    test(state, action: PayloadAction<string>) {
      console.log('hihi vo day');
      state.message = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.message = 'da';
      console.log(action.payload);
    });
  },
});

export const { test: setMessage } = testSlice.actions;
export default testSlice.reducer;
