import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Product from "../../types.ts/Product";

const initialState: Product[] = [];

const productsSlice = createSlice({
  name: "productsSlice",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.push(action.payload);
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      const foundIndex = state.findIndex((p) => p.id === action.payload);
      if (foundIndex !== -1) {
        state.splice(foundIndex, 1);
      }
    },
  },
});

const productsReducer = productsSlice.reducer;
export const { addProduct, removeProduct } = productsSlice.actions;
export default productsReducer;
