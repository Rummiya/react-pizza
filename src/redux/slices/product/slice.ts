import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ProductItem, ProductState, SearchProductsParams, Status } from './types';

export const fetchProducts = createAsyncThunk<ProductItem[], SearchProductsParams>(
  'product/fetchProductsStatus',
  async (params) => {
    const { category, sortBy, sortOrder } = params;
    const { data } = await axios.get<ProductItem[]>(
      `https://66ddcec5f7bcc0bbdcdf11a5.mockapi.io/items?${category}&sortBy=${sortBy.sortProperty}&order=${sortOrder}`,
    );

    return data;
  },
);

const initialState: ProductState = {
  items: [],
  status: Status.LOADING,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct(state, action: PayloadAction<ProductItem[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.items = [];
        state.status = Status.LOADING;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.items = [];
        state.status = Status.ERROR;
      });
  },
});

export const { setProduct } = productSlice.actions;

export default productSlice.reducer;
