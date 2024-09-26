import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './../../store';
import { SearchProductsParams } from './../product/types';
import { FilterState, SortOrder, SortPropertyEnum, SortState } from './types';

const initialState: FilterState = {
  searchValue: '',
  categoryId: 0,
  sort: {
    name: 'популярности',
    sortProperty: SortPropertyEnum.RATING,
  },
  sortOrder: 'asc',
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<SortState>) {
      state.sort = action.payload;
    },
    setSortOrder(state, action: PayloadAction<SortOrder>) {
      state.sortOrder = action.payload;
    },
    setFilters(state, action: PayloadAction<SearchProductsParams>) {
      state.sort = action.payload.sortBy;
      state.sortOrder = action.payload.sortOrder;
      state.categoryId = Number(action.payload.category);
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;

export const { setSearchValue, setCategoryId, setSort, setSortOrder, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
