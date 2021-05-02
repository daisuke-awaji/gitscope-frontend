import {
  Container,
  createStyles,
  CssBaseline,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";
import { SERVICE_NAME } from "../Constants";
import { GitHubLoginButton } from "./GitHubLoginButton";
import VisualizeTeamProductivityLottie from "./Lottie/VisualizeTeamProductivityLottie";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: 10,
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
      color: "white",
      marginTop: 200,
    },
    feature: {
      minHeight: 1000,
    },
    footer: {
      background: "gray",
      height: 300,
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

const MainLandingMessage = () => {
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
          <Typography variant="h1">Visualize</Typography>
          <Typography variant="h1">Team</Typography>
          <Typography variant="h1">Productivity</Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6}>
        <VisualizeTeamProductivityLottie />
      </Grid>
    </Grid>
  );
};

const Feature = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.feature}
    >
      feature
    </Grid>
  );
};

const Footer = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.footer}
    >
      footer
    </Grid>
  );
};

export const LandingPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container fixed>
        <Header />
        <MainLandingMessage />
        <Feature />
      </Container>
      <Footer />
    </div>
  );
};
