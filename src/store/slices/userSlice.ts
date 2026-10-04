import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserData {
  name: string;
  surname: string;
  age: number;
  phone: string;
  email: string;
  isLoggedIn: boolean;
}

const emptyUser: UserData = {
  name: "",
  surname: "",
  age: 0,
  phone: "",
  email: "",
  isLoggedIn: false,
};

function loadUserFromStorage(): UserData {
  try {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : emptyUser;
  } catch {
    return emptyUser;
  }
}

const initialState: UserData = loadUserFromStorage();

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<UserData>) => {
      state.name = action.payload.name;
      state.surname = action.payload.surname;
      state.age = action.payload.age;
      state.phone = action.payload.phone;
      state.email = action.payload.email;
      state.isLoggedIn = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    deleteUserData: (state) => {
      state.name = "";
      state.surname = "";
      state.age = 0;
      state.phone = "";
      state.email = "";
      state.isLoggedIn = false;
      localStorage.removeItem("user");
    },
  },
});

export const { updateUser, deleteUserData } = userSlice.actions;
export default userSlice.reducer;
