import { createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { SERVICE_NAME } from "../Constants";
import { GitHubLoginButton } from "./GitHubLoginButton";
import VisualizeTeamProductivityLottie from "./Lottie/VisualizeTeamProductivityLottie";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 3000,
      paddingTop: 10,
      paddingLeft: 180,
      paddingRight: 180,
      backgroundImage:
        "linear-gradient(to right top, #ffffff, #ebeeff, #cde1ff, #a2d6ff, #63ccff);",
    },
    header: {
      fontWeight: 800,
    },
    logo: {
      width: 35,
      marginRight: 10,
    },
    serviceTitle: {
      fontSize: 20,
    },
    landingMessage: {
      fontSize: 80,
      fontWeight: 800,
      color: "white",
      marginTop: 200,
    },
  })
);

const Header = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
      className={classes.header}
    >
      <Grid item>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <img
              src={`${process.env.PUBLIC_URL}/logo.png`}
              alt="logo"
              className={classes.logo}
            />
          </Grid>
          <Grid item className={classes.serviceTitle}>
            {SERVICE_NAME}
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <GitHubLoginButton />
      </Grid>
    </Grid>
  );
};

const Main = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.landingMessage}
    >
      <Grid item xs={12} sm={6}>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
        >
          <Grid item>Visualize</Grid>
          <Grid item>Team</Grid>
          <Grid item>Productivity</Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6}>
        <VisualizeTeamProductivityLottie />
      </Grid>
    </Grid>
  );
};

export const LandingPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />
      <Main />
    </div>
  );
};
