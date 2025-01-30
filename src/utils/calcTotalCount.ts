import { CartItemState } from '../redux/types';

export const calcTotalCount = (items: CartItemState[]) => {
	return items.reduce((sum, item) => sum + item.count, 0);
};
