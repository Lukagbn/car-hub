import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type CarProps } from "../../components/Card";

interface FavState {
  favCars: CarProps[];
}

function loadFavoritesFromStorage(): CarProps[] {
  try {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

const initialState: FavState = {
  favCars: loadFavoritesFromStorage(),
};

const favSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<CarProps>) => {
      const exists = state.favCars.find(
        (car) => car._id === action.payload._id,
      );
      if (exists) {
        state.favCars = state.favCars.filter(
          (car) => car._id !== action.payload._id,
        );
      } else {
        state.favCars.push({ ...action.payload });
      }
      localStorage.setItem("favorites", JSON.stringify(state.favCars));
    },
  },
});

export const { addToFavorites } = favSlice.actions;
export default favSlice.reducer;
