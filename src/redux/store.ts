import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import cart from './slices/cart.slice';
import filter from './slices/filter.slice';
import popup from './slices/popup.slice';
import product from './slices/product.slice';

export const store = configureStore({
	reducer: { filter, cart, product, popup },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
