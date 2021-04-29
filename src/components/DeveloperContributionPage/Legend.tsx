import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import {
  PullRequestActionDot,
  CommitActionDot,
  CommentActionDot,
} from "./Dots";

const useStyles = makeStyles((theme) => ({
  legend: {
    margin: 10,
    color: "gray",
    fontSize: 14,
    paddingBottom: 10,
    paddingTop: 10,
  },
}));

export const Legend = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={2} alignItems="center" className={classes.legend}>
      <Grid item>
        <PullRequestActionDot />
      </Grid>
      <Grid item>
        <div>PullRequests</div>
      </Grid>

      <Grid item>
        <CommitActionDot />
      </Grid>
      <Grid item>
        <div>Commits</div>
      </Grid>
      <Grid item>
        <CommentActionDot />
      </Grid>
      <Grid item>
        <div>Comments</div>
      </Grid>
    </Grid>
  );
};
