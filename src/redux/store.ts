import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filter/slice';
import cart from './slices/cart/slice';
import product from './slices/product/slice';
import popap from './slices/popup/slice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: { filter, cart, product, popap },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
