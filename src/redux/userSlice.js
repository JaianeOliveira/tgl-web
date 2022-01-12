import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "user",
  initialState: {
    user: "",
    isLogged: false,
  },
  reducers: {
    login(prevState, action) {
      return { ...prevState, isLogged: true, user: action.payload };
    },
    logout(prevStete) {
      return { ...prevStete, isLogged: false, user: "" };
    },
  },
});

export const { login, logout } = slice.actions;

export default slice.reducer;
