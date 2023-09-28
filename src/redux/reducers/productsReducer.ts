import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Product from "../../types.ts/Product";
import PaginationQuery from "../../types.ts/PaginationQuery";
import InitialState from "../../types.ts/InitialState";

const initialState: InitialState = {
  products: [],
  loading: false,
};

export const fetchAllProductsAsync = createAsyncThunk(
  "fetchAllProductsAsync",
  async ({ offset, limit }: PaginationQuery) => {
    try {
      const jsonData = await fetch(
        `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`
      );
      const data: Product[] = await jsonData.json();
      return data;
    } catch (e) {
      const error = e as Error;
      return error;
    }
  }
);

// 3 states: pending, fulfilled, rejected

const productsSlice = createSlice({
  name: "productsSlice",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      const foundIndex = state.products.findIndex(
        (p) => p.id === action.payload
      );
      if (foundIndex !== -1) {
        state.products.splice(foundIndex, 1);
      }
    },
    sortByPrice: (state, action: PayloadAction<"asc" | "desc">) => {
      if (action.payload === "asc") {
        state.products.sort((a, b) => a.price - b.price);
      } else {
        state.products.sort((a, b) => b.price - a.price);
      }
    },
    filterByTitle: (state, action: PayloadAction<string>) => {
      const filteredProducts = state.products.filter((p) =>
        p.title.toLowerCase().includes(action.payload.toLowerCase())
      );
      return {
        ...state,
        products: filteredProducts,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
      if (!(action.payload instanceof Error)) {
        return {
          ...state,
          products: action.payload,
          loading: false,
        };
      }
    });
    builder.addCase(fetchAllProductsAsync.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(fetchAllProductsAsync.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        return {
          ...state,
          error: action.payload.message,
        };
      }
    });
  },
});

const productsReducer = productsSlice.reducer;
export const { addProduct, removeProduct, sortByPrice,filterByTitle } = productsSlice.actions;
export default productsReducer;
