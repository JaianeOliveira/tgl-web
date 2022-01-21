import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/*export const getRecentGames2 = createAsyncThunk('recentGames/get', {
  async () => {

}
});*/
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
      console.log('Recent Games: atualização do estado', state);
    },
  },
});

export const { setRecentGames } = recentGameSlice.actions;
export default recentGameSlice.reducer;
