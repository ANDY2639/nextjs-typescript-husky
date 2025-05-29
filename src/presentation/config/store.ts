import { configureStore, Tuple } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import { serializableMiddleware } from "@/presentation/redux/middleware/serialize";
import rootReducer from "@/presentation/redux/features";

const persistConfig = {
  key: 'dropshipping',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: () => new Tuple(
    serializableMiddleware,
  ),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
