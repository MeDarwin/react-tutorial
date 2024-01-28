import { configureStore } from "@reduxjs/toolkit";
import { counter } from "./reducer/counterSlice";
import { jsonPlaceholderApi } from "./services/jsonPlaceholderApi";
import { pokemonApi } from "./services/pokeApi";

export const store = configureStore({
  reducer: {
    counter: counter.reducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [jsonPlaceholderApi.reducerPath]: jsonPlaceholderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(pokemonApi.middleware)
      .concat(jsonPlaceholderApi.middleware),
});
