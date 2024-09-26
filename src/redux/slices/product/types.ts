import { SortOrder, SortState } from '../filter/types';

export type ProductItem = {
  id: number;
  imageUrl: string;
  title: string;
  desc: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface ProductState {
  items: ProductItem[];
  status: Status;
}

export type SearchProductsParams = {
  sortBy: SortState;
  category: string;
  sortOrder: SortOrder;
};
