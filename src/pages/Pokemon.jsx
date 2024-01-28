import { Suspense } from "react";
import { Await, Link, useAsyncValue, useLoaderData, useSearchParams } from "react-router-dom";
import Loading from "../components/Loading";
import RootBoundary from "../components/RootBoundary";
const PokemonList = () => {
  const { count, next, previous, results } = useAsyncValue();
  const [params, setParams] = useSearchParams({ offset: 0 });
  const offset = Number(params.get("offset"));

  return (
    <>
      <h5>{count}</h5>
      <div className="row">
        {/* ------------------------------- PREV & NEXT ------------------------------  */}
        <div className="d-flex gap-3">
          <button
            disabled={!previous}
            className={`btn btn-primary w-100 ${!previous && "disabled"}`}
            onClick={() => setParams({ offset: offset - 20 })}
          >
            Previous
          </button>
          <button
            disabled={!next}
            className={`btn btn-primary w-100 ${!next && "disabled"}`}
            onClick={() => setParams({ offset: offset + 20 })}
          >
            Next
          </button>
        </div>
        {/* ------------------------------- PREV & NEXT ------------------------------  */}
        {/* ------------------------------ POKEMON CARD ------------------------------  */}
        {results.map(({ name, url }, no) => (
          <div className="col-6 mt-3" key={name}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title m-0">
                  {offset + ++no}. {name}
                </h5>
              </div>
              <div className="card-footer">
                <div>
                  <Link to={`/pokemon/${name}`} className="link-underline link-underline-opacity-0">
                    <small className="text-body-tertiary">See {name}!</small>
                  </Link>
                </div>
                <div>
                  <a href={url} className="link-underline link-underline-opacity-0" target="_blank" rel="noreferrer">
                    <small className="text-body-tertiary">See {name} API!</small>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* ------------------------------ POKEMON CARD ------------------------------  */}
      </div>
    </>
  );
};

const Pokemon = () => {
  const { pokemon } = useLoaderData();

  return (
    <div className="container my-3">
      <h1>All Pokemons</h1>
      <Suspense fallback={<Loading />}>
        <Await resolve={pokemon} errorElement={<RootBoundary />}>
          <PokemonList />
        </Await>
      </Suspense>
    </div>
  );
};

export default Pokemon;
