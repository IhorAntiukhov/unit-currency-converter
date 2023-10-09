import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  currencyReducer, setFromCurrency, setToCurrency, swapCurrencies, setAmount, setExchangeRatesDate
} from './slices/currencySlice';
import {
  notificationsReducer, showNotification, startNotificationFading, removeNotification
} from './slices/notificationsSlice';
import { currencyApi, useGetExchangeRatesQuery } from './apis/currencyApi';

const store = configureStore({
  reducer: {
    currencyReducer,
    notificationsReducer,
    [currencyApi.reducerPath]: currencyApi.reducer
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(currencyApi.middleware);
  }
});

setupListeners(store.dispatch);

export {
  store, setFromCurrency, setToCurrency, swapCurrencies, setAmount, setExchangeRatesDate,
  showNotification, startNotificationFading, removeNotification, useGetExchangeRatesQuery
};
