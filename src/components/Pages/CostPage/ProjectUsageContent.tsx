import { createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import ProjectUsageCost from "./ProjectUsageCost";
import UsageFreeCard from "./UsageFreeCard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  })
);
const ProjectUsageContent = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <ProjectUsageCost />
      </Grid>
      <Grid item xs={12}>
        <UsageFreeCard />
      </Grid>
    </Grid>
  );
};

export default ProjectUsageContent;
