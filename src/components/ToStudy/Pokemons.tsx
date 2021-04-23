import { Grid } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { Page, PokemonApi } from "../../axios/pokemon";
import { PokemonCardItem } from "./PokemonCardItem";

const api = new PokemonApi();

export const Pokemons = () => {
  const [pokemonsPage, setPokemonsPage] = useState<Page>();

  // const [limit, setLimit] = useState(40);
  const limit = 40;
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const [maxPage, setMaxPage] = useState(0);

  useEffect(() => {
    const listPets = async () => {
      const pokemon = await api.getPokemon(offset, limit);
      if (!pokemon || !pokemon.data.count) return;

      setPokemonsPage(pokemon.data);
      setMaxPage(Math.floor(pokemon.data.count / limit));
    };
    listPets();
  }, [limit, offset, page]);

  const handleChangePage = async (event: any, value: number) => {
    setPage(value);
    const offset = (value - 1) * limit;
    const result = await api.getPokemon(offset, limit);
    // setOffset(offset - limit);
    setPokemonsPage(result.data);
  };

  if (!pokemonsPage || !pokemonsPage.count) return null;

  return (
    <>
      <Grid container spacing={3}>
        {pokemonsPage?.results?.map((item) => {
          return (
            <Grid item>
              <PokemonCardItem {...item} />
            </Grid>
          );
        })}
      </Grid>
      <h5>
        {offset + 1} -
        {offset + limit < pokemonsPage.count
          ? offset + limit
          : pokemonsPage.count}
        / {pokemonsPage.count}
      </h5>
      <Pagination
        count={maxPage}
        page={page}
        onChange={handleChangePage}
        shape="rounded"
      />
    </>
  );
};
