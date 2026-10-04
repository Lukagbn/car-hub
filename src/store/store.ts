import { configureStore } from "@reduxjs/toolkit";
import CarReducer from "./slices/carSlice";
import UserReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: { favorites: CarReducer, user: UserReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
