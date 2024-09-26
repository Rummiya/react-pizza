export type Product = {
  id: number;
  title: string;
  desc: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

export interface PopapState {
  product: Product;
  isOpened: boolean;
}
