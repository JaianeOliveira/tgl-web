import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    email: "",
    user: "",
    token: null,
  },
  reducers: {
    login(state, action) {
      state.email = action.payload.email;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;
