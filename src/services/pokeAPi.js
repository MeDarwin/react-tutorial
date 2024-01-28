//Penggunaan diluar react (tanpa hooks)
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  keepUnusedDataFor: 86400,
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2" }),
  tagTypes: ["Pokemon"],
  endpoints: (builder) => ({
    getPokemons: builder.query({
      query: (offset) => ({
        url: `/pokemon`,
        method: "GET",
        params: {
          offset: offset ?? 0,
          limit: 20,
        },
      }),
      providesTags: ["Pokemon"],
    }),
  }),
});
