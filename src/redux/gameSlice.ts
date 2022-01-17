import { GameInfo } from "../types/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = {
  min_cart_value: number | null;
  types: GameInfo[];
};
type Reducers = {
  getData: (
    state: State,
    action: PayloadAction<{ min_cart_value: number; types: GameInfo[] }>
  ) => void;
};

const initialState = {
  min_cart_value: null,
  types: [],
};
export const gameSlice = createSlice<State, Reducers>({
  name: "game",
  initialState,
  reducers: {
    getData(state, action) {
      state.min_cart_value = action.payload.min_cart_value;
      state.types = action.payload.types;
    },
  },
});

export const { getData } = gameSlice.actions;
export default gameSlice.reducer;
