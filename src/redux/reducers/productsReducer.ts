import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Product from "../../types.ts/Product";

const initialState: Product[] = [];

export const fetchAllProductsAsync = createAsyncThunk(
  "fetchAllProductsAsync",
  async () => {
    const jsonData = await fetch("https://api.escuelajs.co/api/v1/products")
    const data: Product[] = await jsonData.json()
    return data
  }
)

// 3 states: pending, fulfilled, rejected

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
  extraReducers: (builder) => {
    builder.addCase(fetchAllProductsAsync.fulfilled, (state, action)=>{
      return action.payload
    })
  }
});

const productsReducer = productsSlice.reducer;
export const { addProduct, removeProduct } = productsSlice.actions;
export default productsReducer;
