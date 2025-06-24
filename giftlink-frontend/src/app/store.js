import { configureStore } from "@reduxjs/toolkit";
import giftReducer from "../features/gift/giftSlice";
import authReducer from "../features/auth/authSlice";

import storage from "redux-persist/lib/storage"; // mặc định là localStorage
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // chỉ persist slice "auth"
};

const rootReducer = combineReducers({
  auth: authReducer,
  // thêm reducer khác nếu cần
  gift: giftReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // tránh warning với redux-persist
    }),
});

export const persistor = persistStore(store);
