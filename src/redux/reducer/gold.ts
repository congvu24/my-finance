import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  addInvestGold,
  getCurrentPrice,
  getGoldPortfolio,
  getGoldPrice,
} from '../../services/Gold';
import { AddInvestGold } from '../../types/gold';
import { PayloadWithCallback } from '../../types/utils';
import { offLoading, onLoading } from './app';

let globalSocket = null;

export const getMyGoldPortfolio = createAsyncThunk(
  'gold/getMyPortfolio',
  async (data, thunkApi) => {
    try {
      const result = await getGoldPortfolio();
      const balance = {
        amount: 0,
        value: 0,
      };

      thunkApi.dispatch(setTransaction(result));

      result.forEach(item => {
        balance.amount =
          item.type > 0
            ? balance.amount + item.amount
            : balance.amount - item.amount;
        if (balance.value === 0 && item.type > 0) {
          balance.value = item.price;
        } else if (item.type > 0) {
          balance.value = (
            (balance.amount * balance.value + item.amount * item.price) /
            (balance.amount + item.amount)
          ).toFixed(2);
        }
      });

      thunkApi.dispatch(setPortfolio(balance));
    } catch (err) {
      // thunkApi.dispatch(setPortfolio(balance));
    }
  },
);

export const getGoldPriceForChart = createAsyncThunk(
  'gold/getData',
  async (data, thunkApi) => {
    try {
      const result = await getGoldPrice();
      thunkApi.dispatch(setData(result));
    } catch (err) {
      thunkApi.dispatch(setData([]));
    }
  },
);

export const addInvestGoldToFirebase = createAsyncThunk(
  'gold/addInvest',
  async (payload: PayloadWithCallback<AddInvestGold>, thunkApi) => {
    try {
      thunkApi.dispatch(onLoading());
      await addInvestGold(payload.data);
      payload.onSuccess?.();
      thunkApi.dispatch(getMyGoldPortfolio());
      // thunkApi.dispatch(setData(result));
    } catch (err) {
      payload.onFailed?.();
      // thunkApi.dispatch(setData([]));
    } finally {
      thunkApi.dispatch(offLoading());
    }
  },
);

export const startListenPrice = createAsyncThunk(
  'gold/startListenPrice',
  async (payload, thunkApi) => {
    try {
      globalSocket = new WebSocket(
        'wss://prod-pusher.backend-capital.com/app/app_key?protocol=7&client=js&version=4.2.2&flash=false',
      );
      globalSocket.onopen = () => {
        console.log('connected');
        globalSocket?.send(
          JSON.stringify({
            event: 'pusher:subscribe',
            data: { channel: '27045129890124996' },
          }),
        );
      };

      globalSocket.onmessage = ({ data }) => {
        const parsedData = JSON.parse(data);
        if (parsedData.data && parsedData.event === 'bbo') {
          return thunkApi.dispatch(
            setCurrentPrice(JSON.parse(parsedData.data)),
          );
        }
      };

      globalSocket.onclose = () => {
        console.log('closed');
      };
    } catch (err) {}
  },
);

export const getCurrentGoldPrice = createAsyncThunk(
  'gold/getCurrentGoldPrice',
  async (payload, thunkApi) => {
    try {
      const currentPrice = await getCurrentPrice();
      const result = {
        ...currentPrice,
        pc_col: 'greenFront',
        pcp: 0,
        pc: 0,
        last_numeric: currentPrice.ask.toFixed(2),
        ts: currentPrice.timestamp,
      };
      thunkApi.dispatch(setCurrentPrice(result));
    } catch (err) {}
  },
);

const goldSlice = createSlice({
  name: 'gold',
  initialState: {
    transaction: [],
    data: [],
    socket: undefined,
    currentPrice: undefined,
    balance: { amount: 0, value: 0 },
  },
  reducers: {
    setData(state, action: PayloadAction<[]>) {
      state.data = action.payload;
    },
    setPortfolio(
      state,
      action: PayloadAction<{ amount: number; value: number }>,
    ) {
      state.balance = action.payload;
    },
    setCurrentPrice(state, action: PayloadAction<any>) {
      if (!state.currentPrice) {
        state.currentPrice = {
          ...action.payload,
          pc_col: 'redFont',
          pcp: 0,
          pc: 0,
          last_numeric: action.payload.ask.toFixed(2),
          timestamp: action.payload.ts,
        };
      } else {
        if (action.payload.ask - state.currentPrice.ask) {
          state.currentPrice = {
            ...action.payload,
            pc_col:
              action.payload.ask < state.currentPrice.ask
                ? 'redFont'
                : 'greenFont',
            pcp: (
              ((action.payload.ask - state.currentPrice.ask) /
                action.payload.ask) *
              100
            ).toFixed(4),
            pc: (action.payload.ask - state.currentPrice.ask).toFixed(2),
            last_numeric: action.payload.ask.toFixed(2),
            timestamp: action.payload.ts,
          };
        }
      }
    },
    stopSocket(state) {
      console.log('close');
      globalSocket?.close();
    },
    setTransaction(state, action: PayloadAction<any>) {
      state.transaction = action.payload;
    },
  },
});

export const {
  setData,
  setPortfolio,
  setCurrentPrice,
  stopSocket,
  setTransaction,
} = goldSlice.actions;
export default goldSlice.reducer;
