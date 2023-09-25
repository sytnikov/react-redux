import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import User from "../../types.ts/User";

const initialState: User[] = [];

const usersSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {
    addNewUser: (state, action: PayloadAction<User>) => {
      state.push(action.payload);
    },
  },
});

const usersReducer = usersSlice.reducer;
export const { addNewUser } = usersSlice.actions;
export default usersReducer;
