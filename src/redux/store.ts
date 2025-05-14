import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import authReducer from "./features/auth/authSlice";
import cartReducer from "./features/cart/cartSlice";
import { baseApi } from "./api/baseApi";

// 1️⃣ Combined Reducers
const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer,
  cart: cartReducer,
});

// 2️⃣ Persist Config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "cart"], // only these slices will be persisted
};

// 3️⃣ Create Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4️⃣ Configure Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

// 5️⃣ Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 6️⃣ Persistor
export const persistor = persistStore(store);
