import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import gameSlice from "./gameSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    game: gameSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
