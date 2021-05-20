import { Grid } from "@material-ui/core";
import React from "react";
import { JavaScriptIcon, TypeScriptIcon } from "./Icons/Icons";

export const SupportedLaunguage = () => {
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid xs={2}>
        <JavaScriptIcon style={{ width: 80 }} />
      </Grid>
      <Grid xs={2}>
        <TypeScriptIcon style={{ width: 80 }} />
      </Grid>
    </Grid>
  );
};
