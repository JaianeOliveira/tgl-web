import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type State = {
  id: number | null;
  email: string;
  is_admin: number | null;
  name: string;
  token: string;
  token_created_at: string;
  created_at: string;
  updated_at: string;
  bets: [];
  picture: null | string;
};
type Reducers = {
  updateUser: (state: State, action: PayloadAction<State>) => void;
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const initialState: State = JSON.parse(localStorage.getItem('account')) || {
  id: null,
  email: '',
  is_admin: null,
  name: '',
  token: '',
  token_created_at: '',
  created_at: '',
  updated_at: '',
  bets: [],
  picture: null,
};

export const accountSlice = createSlice<State, Reducers>({
  name: 'account',
  initialState: initialState,
  reducers: {
    updateUser: (state, action) => {
      state = action.payload;
      localStorage.setItem('account', JSON.stringify(state));
      console.log('Estado atualizado', state);
    },
  },
});

export const { updateUser } = accountSlice.actions;

export default accountSlice.reducer;
