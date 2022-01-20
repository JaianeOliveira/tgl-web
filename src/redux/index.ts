import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import gameSlice from "./gameSlice";
import recentGamesSlice from "./recentGamesSlice";
import cartSlice from "./cartSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    game: gameSlice,
    recentGames: recentGamesSlice,
    cart: cartSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
