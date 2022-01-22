import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CartItem = {
  id: number;
  game_id: number;
  gameName: string;
  price: number;
  color: string;
  bet: number[];
};
type Cart = {
  cart: CartItem[];
  total: number;
};
type Reducers = {
  addItem: (state: Cart, action: PayloadAction<CartItem>) => void;
  removeItem: (
    state: Cart,
    action: PayloadAction<{ id: number; price: number }>
  ) => void;
  clearCart: (state: Cart) => void;
};

const initialState: Cart = {
  cart: [],
  total: 0,
};

export const cartSlice = createSlice<Cart, Reducers>({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.cart.push(action.payload);
      state.total = state.total + action.payload.price;
    },
    removeItem: (state, action) => {
      const index = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index === -1) {
        return;
      }
      state.cart.splice(index, 1);
      state.total = state.total - action.payload.price;
    },
    clearCart: (state) => {
      state.total = 0;
      state.cart = [];
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
