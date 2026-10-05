import { configureStore } from "@reduxjs/toolkit";
import CarReducer from "./slices/carSlice";

export const store = configureStore({
  reducer: { favorites: CarReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
