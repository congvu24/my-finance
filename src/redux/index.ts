import { combineReducers, configureStore } from '@reduxjs/toolkit';
import testReducer from './reducer/test';
import appReducer from './reducer/app';
import userReducer from './reducer/user';
import featureReducer from './reducer/feature';
import transactionReducer from './reducer/transaction';
import goldReducer from './reducer/gold';
import coinReducer from './reducer/coin';
import settingReducer from './reducer/settingSpending';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const rootReducer = combineReducers({
  test: testReducer,
  app: appReducer,
  user: userReducer,
  feature: featureReducer,
  transaction: transactionReducer,
  gold: goldReducer,
  coin: coinReducer,
  setting: settingReducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  blacklist: ['app', 'feature', 'gold'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
