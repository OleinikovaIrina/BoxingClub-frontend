import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {}, // пока пусто
});

// типы — пока базовые
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
