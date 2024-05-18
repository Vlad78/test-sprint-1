import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { configureStore } from "@reduxjs/toolkit";

import { counterSlice } from "../features/counterSlice";

const persistConfig = {
  key: "root",
  storage,
  throttle: 1000,
};
const persistedReducer = persistReducer(persistConfig, counterSlice.reducer);

export const store = configureStore({
  reducer: {
    counter: persistedReducer,
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
