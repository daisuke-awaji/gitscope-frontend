import { makeStyles } from "@material-ui/core";
import React from "react";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

type PokemonProps = {
  name?: string;
  url?: string;
};
export const PokemonCardItem = (props: PokemonProps) => {
  const classes = useStyles();

  if (!props.url) return null;
  const a = new URL(props?.url).pathname.split("/");
  const index = a[a.length - 2];
  return (
    <>
      <div className={classes.paper}>{props.name}</div>
      <img
        alt={props.name}
        style={{ width: 100, height: 100 }}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`}
      />
    </>
  );
};
