import { Category } from './../../models/Category';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllCategory } from '../../services/Category';
import { MoneySource } from '../../models/MoneySource';
import {
  createMoneySource,
  getAllMoneySource,
} from '../../services/MoneySource';
import { CreateMoneySource } from '../../types/moneySource';
import Toast from 'react-native-root-toast';
import { offLoading, onLoading } from './app';
import { PayloadWithCallback } from '../../types/utils';

export const getCategory = createAsyncThunk(
  'feature/getCategory',
  async (data, thunkApi) => {
    try {
      const result = await getAllCategory();
      thunkApi.dispatch(setCategory(result));
    } catch (err) {
      thunkApi.dispatch(setCategory([]));
    }
  },
);

export const getMoneySource = createAsyncThunk(
  'feature/getMoneySource',
  async (data, thunkApi) => {
    try {
      const result = await getAllMoneySource();
      console.log(result)
      thunkApi.dispatch(setMoneySource(result));
    } catch (err) {
      thunkApi.dispatch(setMoneySource([]));
    }
  },
);

export const addMoneySource = createAsyncThunk(
  'feature/addMoneySource',
  async (payload: PayloadWithCallback<CreateMoneySource>, thunkApi) => {
    try {
      thunkApi.dispatch(onLoading());
      await createMoneySource(payload.data);
      thunkApi.dispatch(getMoneySource());
      payload.onSuccess?.();
    } catch (err) {
      Toast.show('Error while creating money source', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
        shadow: true,
        animation: true,
        textStyle: {
          fontSize: 12,
        },
      });
      payload.onFailed?.();
    } finally {
      thunkApi.dispatch(offLoading());
    }
  },
);

const featureSlice = createSlice({
  name: 'feature',
  initialState: {
    category: [] as Category[],
    moneySource: [] as MoneySource[],
  },
  reducers: {
    setCategory(state, action: PayloadAction<Category[]>) {
      state.category = action.payload;
    },
    setMoneySource(state, action: PayloadAction<MoneySource[]>) {
      state.moneySource = action.payload;
    },
  },
});

export const { setCategory, setMoneySource } = featureSlice.actions;
export default featureSlice.reducer;
