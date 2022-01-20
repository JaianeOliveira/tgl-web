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
const initialState: State = [
  {
    choosen_numbers: '6,15,22,31,42,50',
    created_at: '2022-01-20T16:39:42.000-03:00',
    game_id: 7,
    id: 1,
    price: 4.5,
    type: { id: 7, type: 'Mega-Sena' },
    user_id: 1,
  },
];

export const recentGameSlice = createSlice({
  name: 'recentGames',
  initialState,
  reducers: {
    setRecentGames(state, action) {
      state = action.payload;
    },
  },
});

export const { setRecentGames } = recentGameSlice.actions;
export default recentGameSlice.reducer;
