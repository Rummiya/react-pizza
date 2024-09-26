import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PopapState, Product } from './types';

const initialState: PopapState = {
  product: {
    id: 0,
    title: 'Пепперони Фреш с перцем',
    desc: 'Пепперони из цыпленка, увеличенная порция моцареллы, томаты, томатный соус',
    price: 805,
    imageUrl: '/img/pizza/peperony-fresh.png',
    sizes: [26, 30, 40],
    types: [0, 1],
  },
  isOpened: false,
};

export const popapSlice = createSlice({
  name: 'popap',
  initialState,
  reducers: {
    getProduct(state, action: PayloadAction<Product>) {
      state.product = action.payload;
    },
    setIsOpened(state, action: PayloadAction<boolean>) {
      state.isOpened = action.payload;
    },
  },
});

export const { getProduct, setIsOpened } = popapSlice.actions;

export default popapSlice.reducer;
