import { Grid } from "@material-ui/core";
import React from "react";
import { BasicCard } from "../../Atoms/BasicCard";

export const Setting = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <BasicCard title="Settings">
          <a href="https://github.com/apps/gitscopeapplocal/installations/new">
            install app
          </a>
        </BasicCard>
      </Grid>
    </Grid>
  );
};
