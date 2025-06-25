import { configureStore } from "@reduxjs/toolkit";
import giftReducer from "../features/gift/giftSlice";
import authReducer from "../features/auth/authSlice";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";

// Persist config từng slice
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "token"],
};

const giftPersistConfig = {
  key: "gift",
  storage,
  whitelist: ["page"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  gift: persistReducer(giftPersistConfig, giftReducer),
});

// Store setup
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
