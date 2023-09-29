import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import CartItem from "../../types.ts/CartItem";
import Product from "../../types.ts/Product";

const initialState: CartItem[] = [];

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const cartItem: CartItem = { ...action.payload, quantity: 1 };
      const foundIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );
      if (foundIndex !== -1) {
        state[foundIndex].quantity++;
      } else {
        state.push(cartItem);
      }
    },
  },
});

const cartReducer = cartSlice.reducer
export const { addToCart } = cartSlice.actions;
export default cartReducer
