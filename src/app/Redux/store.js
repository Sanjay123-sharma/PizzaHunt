import { combineReducers, configureStore } from "@reduxjs/toolkit";
import SliceReducer from './Slice'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  version:1,
  
};
const userReducer=combineReducers({
     food:SliceReducer
})

const persistedReducer = persistReducer(persistConfig, userReducer);
export const myStore = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(myStore);

