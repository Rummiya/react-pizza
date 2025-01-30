import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calcTotalCount } from '../../utils/calcTotalCount';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { getCartLS } from '../../utils/getCartLS';
import { RootState } from '../store';
import { CartItemState, CartState } from './..//types';

const { items, totalPrice, totalCount } = getCartLS();

const initialState: CartState = {
	items,
	totalPrice,
	totalCount,
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, action: PayloadAction<CartItemState>) {
			const findItem = state.items.find(item => item.id === action.payload.id);

			if (findItem) {
				findItem.count++;
			} else {
				state.items.push({
					...action.payload,
					count: 1,
				});
			}

			state.totalPrice = calcTotalPrice(state.items);
			state.totalCount = calcTotalCount(state.items);
		},
		decrement(state, action: PayloadAction<number>) {
			const findItem = state.items.find(item => item.id === action.payload);

			if (findItem) {
				findItem.count--;
			}

			// if (findItem) {
			//   if (findItem.count > 1) {
			//     findItem.count--;
			//   } else {
			//     state.items = state.items.filter((item) => item.id !== findItem.id);
			//   }
			// }

			state.totalPrice = calcTotalPrice(state.items);
			state.totalCount = calcTotalCount(state.items);
		},
		removeItem(state, action: PayloadAction<number>) {
			state.items = state.items.filter(item => item.id !== action.payload);
			state.totalPrice = calcTotalPrice(state.items);
			state.totalCount = calcTotalCount(state.items);
		},
		clearCart(state) {
			state.items = [];
			state.totalPrice = 0;
			state.totalCount = 0;
		},
	},
});

export const selectCart = (state: RootState) => state.cart;
export const selectCartItem = (id: number) => (state: RootState) =>
	state.cart.items.find(item => item.id === id);

export const { addItem, removeItem, clearCart, decrement } = cartSlice.actions;

export default cartSlice.reducer;
