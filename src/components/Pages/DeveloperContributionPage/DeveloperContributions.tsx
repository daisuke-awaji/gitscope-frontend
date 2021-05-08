import { Avatar, Grid, makeStyles, Paper } from "@material-ui/core";
import React from "react";
import {
  PullRequestActionDot,
  CommitActionDot,
  CommentActionDot,
} from "./Dots";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 10,
    minWidth: 1050, // optimized for 1366 × 768
  },
  avaterName: {
    color: "gray",
    width: 30,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  paper: {
    minHeight: 100,
    minWidth: 180,
    padding: 10,
  },
}));

type ContributionCount = {
  pullRequests: number;
  commits: number;
  comments: number;
};

type DeveloperContributionPerDay = {
  date: Date;
  contributionCount: ContributionCount;
};

type User = {
  name: string;
  img: string;
};

type DeveloperContributionsProps = {
  user: User;
  data: DeveloperContributionPerDay[];
};

const DeveloperContributionOneDay = (props: ContributionCount) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper} elevation={0}>
      <div>
        {Array.from({ length: props.pullRequests }, (_, i) => i + 1).map(
          (item) => {
            return <PullRequestActionDot key={item} />;
          }
        )}
      </div>
      <div>
        {Array.from({ length: props.commits }, (_, i) => i + 1).map((item) => {
          return <CommitActionDot key={item} />;
        })}
      </div>
      <div>
        {Array.from({ length: props.comments }, (_, i) => i + 1).map((item) => {
          return <CommentActionDot key={item} />;
        })}
      </div>
    </Paper>
  );
};

const AvaterWithName = (props: User) => {
  const classes = useStyles();

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid>
        <Avatar src={props.img} className={classes.large} />
      </Grid>
      <Grid>
        <span className={classes.avaterName}>{props.name}</span>
      </Grid>
    </Grid>
  );
};
export const DeveloperContributions = (props: DeveloperContributionsProps) => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.root}
      spacing={2}
    >
      <Grid item xs={1} sm={1} md={1} lg={1}>
        <AvaterWithName {...props.user} />
      </Grid>
      {props.data.map(({ contributionCount }) => {
        return (
          <Grid item xs={2} sm={2} md={2} lg={2}>
            <DeveloperContributionOneDay {...contributionCount} />
          </Grid>
        );
      })}
      <Grid item xs={1} sm={1} md={1} lg={1}></Grid>
    </Grid>
  );
};
