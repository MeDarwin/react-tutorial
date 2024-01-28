import { createBrowserRouter, defer } from "react-router-dom";
import Index from "./pages/Index";
import JsonPlaceholder from "./pages/JsonPlaceholder";
import Pokemon from "./pages/Pokemon";
import { pokemonApi } from "./services/pokeApi";
import { store } from "./store";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/pokemon",
    element: <Pokemon />,
    loader: async ({ request }) => {
      const url = new URL(request.url);
      const offset = url.searchParams.get("offset");
      const req = store.dispatch(
        pokemonApi.endpoints.getPokemons.initiate(offset)
      );
      const pokemon = req.unwrap();
      req.unsubscribe();
      return defer({
        pokemon,
      });
    },
  },
  {
    path: "/jsonplaceholder",
    element: <JsonPlaceholder />,
  },
]);
