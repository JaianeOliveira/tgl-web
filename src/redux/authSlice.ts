import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  user: "",
  token: localStorage.getItem("token"),
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.email = action.payload.email;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout(state) {
      state = initialState;
      console.log("Deslogado", state.token);
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
