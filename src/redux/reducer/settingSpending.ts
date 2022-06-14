import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllSetting, updateSetting } from '../../services/Setting';
import { SettingSpending, UpdateSetting } from '../../types/setting';
import { PayloadWithCallback } from '../../types/utils';
import { offLoading, onLoading } from './app';

export const getSettingAction = createAsyncThunk(
  'setting/get',
  async (payload: any, thunkApi) => {
    try {
      // thunkApi.dispatch(onLoading());
      const result = await getAllSetting();
      thunkApi.dispatch(setSetting(result));
      payload.onSuccess?.();
      // thunkApi.dispatch(offLoading());
    } catch (err) {
      payload.onFailed?.();
    } finally {
      // thunkApi.dispatch(offLoading());
    }
  },
);

export const updateSettingAction = createAsyncThunk(
  'setting/update',
  async (payload: PayloadWithCallback<UpdateSetting>, thunkApi) => {
    try {
      thunkApi.dispatch(onLoading());
      const result = await updateSetting(payload.data, payload.data.id);
      if (result) {
        thunkApi.dispatch(getSettingAction(''));
        payload.onSuccess?.();
      } else {
        payload.onFailed?.();
      }
    } catch (err) {
      payload.onFailed?.();
    } finally {
      thunkApi.dispatch(offLoading());
    }
  },
);

const settingSpending = createSlice({
  name: 'settingSpending',
  initialState: {
    setting: [] as SettingSpending[],
  },
  reducers: {
    setSetting(state, action: PayloadAction<SettingSpending[]>) {
      state.setting = action.payload;
    },
  },
});

export const { setSetting } = settingSpending.actions;
export default settingSpending.reducer;
