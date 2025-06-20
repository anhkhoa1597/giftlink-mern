import { configureStore } from "@reduxjs/toolkit";
import giftReducer from "../features/gift/giftSlice";

const store = configureStore({
  reducer: {
    gift: giftReducer,
  },
});

export default store;
