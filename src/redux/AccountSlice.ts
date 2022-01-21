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

// JSON.parse(localStorage.getItem('account')) ||

const initialState: State = {
  bets: [],
  created_at: '',
  email: '',
  id: null,
  is_admin: null,
  name: '',
  picture: null,
  token: '',
  token_created_at: '',
  updated_at: '',
};

export const accountSlice = createSlice<State, Reducers>({
  name: 'account',
  initialState: initialState,
  reducers: {
    updateUser: (state, action) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.is_admin = action.payload.is_admin;
      state.name = action.payload.name;
      state.token = action.payload.token;
      state.token_created_at = action.payload.token_created_at;
      state.created_at = action.payload.created_at;
      state.updated_at = action.payload.updated_at;
      state.bets = action.payload.bets;
      state.picture = action.payload.picture;
      // localStorage.setItem('account', JSON.stringify(state));
      console.log('Account: estado atualizado', state);
    },
  },
});

export const { updateUser } = accountSlice.actions;

export default accountSlice.reducer;
