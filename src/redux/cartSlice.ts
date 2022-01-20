import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
  id: number;
  gameName: string;
  price: number;
  color: string;
  bet: number[];
};
type Cart = CartItem[];
type Reducers = {
  addItem: (state: Cart, action: PayloadAction<CartItem>) => void;
  removeItem: (state: Cart, action: PayloadAction<{ id: number }>) => void;
};

const initialState: Cart = [];
export const cartSlice = createSlice<Cart, Reducers>({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload);
    },
    removeItem: (state, action) => {
      let id = state.findIndex((item) => item.id === action.payload.id);
      state.splice(id, 1);
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
