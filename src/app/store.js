import { configureStore, combineReducers } from "@reduxjs/toolkit";
import weatherReducer from "../features/weatherSlice";
import storage from "redux-persist/lib/storage"; 
import { persistReducer, persistStore } from "redux-persist";

const rootReducer = combineReducers({
    weather: weatherReducer,
});

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["weather"],
}

const persisted = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persisted,
    middleware: (getDefault) => 
        getDefault({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);