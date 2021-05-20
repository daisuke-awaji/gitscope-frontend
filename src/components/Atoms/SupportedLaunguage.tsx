import { Grid } from "@material-ui/core";
import React from "react";
import { JavaScriptIcon, TypeScriptIcon } from "./Icons/Icons";

export const SupportedLaunguage = () => {
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <JavaScriptIcon style={{ width: 90, marginLeft: 10, marginRight: 10 }} />
      <TypeScriptIcon style={{ width: 90, marginLeft: 10, marginRight: 10 }} />
    </Grid>
  );
};
