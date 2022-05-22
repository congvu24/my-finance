import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Toast from 'react-native-root-toast';
import { offLoading, onLoading } from './app';
import { PayloadWithCallback } from '../../types/utils';
import { Transaction } from '../../models/Transaction';
import { CreateTransaction } from '../../types/transaction';
import {
  createTransaction,
  getAllTransaction,
} from '../../services/Transaction';

export const getTransactions = createAsyncThunk(
  'transaction/get',
  async (data, thunkApi) => {
    try {
      const result = await getAllTransaction();
      thunkApi.dispatch(setTransaction(result));
    } catch (err) {
      thunkApi.dispatch(setTransaction([]));
    }
  },
);

export const addTransaction = createAsyncThunk(
  'transaction/add',
  async (payload: PayloadWithCallback<CreateTransaction>, thunkApi) => {
    try {
      thunkApi.dispatch(onLoading());
      await createTransaction(payload.data);
      thunkApi.dispatch(getTransactions());
      payload.onSuccess?.();
    } catch (err) {
      Toast.show('Error while creating transaction', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
        shadow: true,
        animation: true,
        textStyle: {
          fontSize: 14,
        },
      });
      payload.onFailed?.();
    } finally {
      thunkApi.dispatch(offLoading());
    }
  },
);

const featureSlice = createSlice({
  name: 'transaction',
  initialState: {
    transaction: [] as Transaction[],
  },
  reducers: {
    setTransaction(state, action: PayloadAction<Transaction[]>) {
      state.transaction = action.payload;
    },
  },
});

export const { setTransaction } = featureSlice.actions;
export default featureSlice.reducer;
