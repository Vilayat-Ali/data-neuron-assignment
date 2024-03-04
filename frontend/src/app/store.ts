import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slice/app.slice";

import { todoApi } from "./api/todo.api";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    todo: todoReducer, // 📚 Include the todoReducer in the store
    [todoApi.reducerPath]: todoApi.reducer, // 🌟 Include the todoApi reducer in the store
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware), // 🛡️ Add the middleware for the todoApi
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
