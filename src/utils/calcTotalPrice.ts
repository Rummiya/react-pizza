import { CartItemState } from '../redux/types';

export const calcTotalPrice = (items: CartItemState[]) => {
	return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};
