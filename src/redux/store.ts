import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

import productsReducer from "./reducers/productsReducer";
import usersReducer from "./reducers/usersReducer";
import cartReducer from "./reducers/cartReducer";
import { persistReducer, persistStore } from "redux-persist";
import productApis from "./apis/productApis";
import { setupListeners } from "@reduxjs/toolkit/dist/query/react";

const preCartReducer = JSON.parse(localStorage.getItem("cart") || "[]");

// const store = configureStore({
//   reducer: {
//     productsReducer,
//     usersReducer,
//     cartReducer,
//   },
//   preloadedState: {
//     cartReducer: preCartReducer,
//   },
// });

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cartReducer", "productReducer"],
};

const rootReducer = combineReducers({
  productsReducer,
  usersReducer,
  cartReducer,
  [productApis.reducerPath]: productApis.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApis.middleware),
});

// const updateLocalStorage = () => {
//   const cart = store.getState().cartReducer;
//   localStorage.setItem("cart", JSON.stringify(cart));
// };

// store.subscribe(updateLocalStorage); // listen to the changes in the store

setupListeners(store.dispatch)

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);

export default store;
