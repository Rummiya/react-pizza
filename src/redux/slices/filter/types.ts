export enum SortPropertyEnum {
  RATING = 'rating',
  TITLE = 'title',
  PRICE = 'price',
}

export type SortState = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export type SortOrder = 'asc' | 'desc';

export interface FilterState {
  searchValue: string;
  categoryId: number;
  sort: SortState;
  sortOrder: SortOrder;
}
