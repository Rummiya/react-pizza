export type CartItemState = {
  id: number;
  imageUrl: string;
  title: string;
  price: number;
  type: string;
  size: number;
  count: number;
};

export interface CartState {
  totalPrice: number;
  totalCount: number;
  items: CartItemState[];
}
