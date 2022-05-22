import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  addInvestCoin,
  getCoinHistoryPrice,
  getCoinPortfolio,
} from '../../services/Coin';
import { AddInvestCoin } from '../../types/coin';
import { PayloadWithCallback } from '../../types/utils';
import { offLoading, onLoading } from './app';

let globalSocket: WebSocket | null = null;

export const getMyCoinPortfolio = createAsyncThunk(
  'coin/getMyPortfolio',
  async (data, thunkApi) => {
    try {
      const result = await getCoinPortfolio();
      console.log(result);
      let portfolio: any = {};

      result.forEach(item => {
        if (portfolio[item.code]) {
          const balance = portfolio[item.code];
          balance.amount =
            item.type > 0
              ? balance.amount + item.amount
              : balance.amount - item.amount;
          balance.value = (
            (balance.amount * balance.value + item.amount * item.price) /
            (balance.amount + item.amount)
          ).toFixed(2);
        } else if (item.type > 0) {
          const balance = {
            code: item.code,
            amount: item.amount,
            value: item.price,
            coinId: item.coinId,
            symbol: item.symbol,
          };
          portfolio[item.code] = { ...balance };
        }
      });
      thunkApi.dispatch(setTransaction(result));
      thunkApi.dispatch(setPortfolio(portfolio));
    } catch (err) {
      // thunkApi.dispatch(setPortfolio(balance));
    }
  },
);

export const getCoinHistoryPriceRedux = createAsyncThunk(
  'coin/getCoinHistoryPrice',
  async (code, thunkApi) => {
    try {
      const result = await getCoinHistoryPrice(code);
      thunkApi.dispatch(setChartData({ code: code, data: result }));
    } catch (err) {
      console.log(err);

      // thunkApi.dispatch(setPortfolio(balance));
    }
  },
);

export const addInvestCoinToFirebase = createAsyncThunk(
  'coin/addInvest',
  async (payload: PayloadWithCallback<AddInvestCoin>, thunkApi) => {
    try {
      thunkApi.dispatch(onLoading());
      await addInvestCoin(payload.data);
      payload.onSuccess?.();
      thunkApi.dispatch(getMyCoinPortfolio());
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
  'coin/startListenPrice',
  async (payload: string[], thunkApi) => {
    try {
      globalSocket?.close();
      globalSocket = new WebSocket('wss://stream.binance.com/stream');
      globalSocket.onopen = () => {
        console.log('connected');
        try {
          globalSocket?.send(
            JSON.stringify({
              method: 'SUBSCRIBE',
              params: ['!miniTicker@arr@3000ms'],
              id: 1,
            }),
          );
        } catch (err) {}
      };

      globalSocket.onmessage = ({ data }) => {
        const parsedData = JSON.parse(data);
        if (parsedData.data) {
          const state = thunkApi.getState();
          let result = {};

          parsedData.data.forEach(item => {
            if (payload.includes(item.s)) {
              result[item.s] = item;
            }
          });
          thunkApi.dispatch(setPrice({ ...state.coin.price, ...result }));
        }
      };

      globalSocket.onclose = () => {
        console.log('closed');
      };
    } catch (err) {}
  },
);

const coinSlice = createSlice({
  name: 'coin',
  initialState: {
    transaction: [],
    portfolio: {},
    price: [],
    chartData: {},
  },
  reducers: {
    setPortfolio(state, action: PayloadAction<any>) {
      state.portfolio = action.payload;
      state.portfolio = action.payload;
    },
    setTransaction(state, action: PayloadAction<any>) {
      state.transaction = action.payload;
    },
    setPrice(state, action: PayloadAction<any>) {
      state.price = action.payload;
    },
    stopListenPrice() {
      console.log('disconnected');
      globalSocket?.close();
    },
    setChartData(state, action: PayloadAction<any>) {
      state.chartData = {
        ...state.chartData,
        [action.payload.code]: action.payload.data,
      };
    },
  },
});

export const {
  setPortfolio,
  setTransaction,
  stopListenPrice,
  setPrice,
  setChartData,
} = coinSlice.actions;
export default coinSlice.reducer;
