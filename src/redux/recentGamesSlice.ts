import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const recentGameSlice = createSlice({
  name: "recentGames",
  initialState: [],
  reducers: {
    setRecentGames(state, action) {
      state = action.payload;
    },
  },
});

export const { setRecentGames } = recentGameSlice.actions;
export default recentGameSlice.reducer;
