import { createSlice } from '@reduxjs/toolkit';

type State = {
  choosen_numbers: string;
  created_at: string;
  game_id: number;
  id: number;
  price: number;
  type: {
    id: number;
    type: string;
  };
  user_id: number;
}[];
const initialState: State = [];

export const recentGameSlice = createSlice({
  name: 'recentGames',
  initialState,
  reducers: {
    setRecentGames(state, action) {
      state.splice(0, state.length);
      state.push(...action.payload);
    },
  },
});

export const { setRecentGames } = recentGameSlice.actions;
export default recentGameSlice.reducer;
