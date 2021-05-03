import {
  createStyles,
  CssBaseline,
  Grid,
  makeStyles,
  Theme,
} from '@material-ui/core';
import React from 'react';
import { SERVICE_NAME } from '../../Constants';
import { BasicCard } from '../BasicCard';
import { GitHubLoginButton } from '../GitHubLoginButton';
import PullRequestLeadTimeDemoLottie from '../Lottie/PullRequestLeadTimeDemoLottie';
import VisualizeTeamProductivityLottie from '../Lottie/VisualizeTeamProductivityLottie';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: 10,
      backgroundImage:
        'linear-gradient(to right top, #ffffff, #ebeeff, #cde1ff, #a2d6ff, #63ccff);',
    },
    header: {
      fontWeight: 800,
      paddingLeft: 10,
      paddingRight: 10,
    },
    logo: {
      width: 35,
      marginRight: 10,
    },
    serviceTitle: {
      fontSize: 20,
    },
    landingMessage: {
      color: 'white',
      marginTop: '8vh',
      fontSize: 'clamp(5vw, 100px, 10vw)',
      fontWeight: 800,
      paddingLeft: 10,
      paddingRight: 10,
    },
    feature: {
      minHeight: 300,
    },
    featureContainer: {
      padding: 10,
    },

    footer: {
      background: 'gray',
      height: 300,
    },
  }),
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
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
        >
          <div>Minimize</div>
          <div>Lead Time</div>
        </Grid>
      </Grid>
      <Grid item xs={10} sm={10} md={6} lg={6}>
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
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="center"
        xs={12}
        sm={12}
        spacing={2}
      >
        <Grid
          xs={12}
          sm={12}
          md={4}
          lg={4}
          className={classes.featureContainer}
        >
          <BasicCard
            title="Pull Request Lead Time"
            style={{
              backgroundImage:
                'linear-gradient(to right, #ffecd2 0%, #fcb69f 100%)',
            }}
          >
            <div style={{ height: 300 }}>
              <PullRequestLeadTimeDemoLottie />
            </div>
          </BasicCard>
        </Grid>
        <Grid
          xs={12}
          sm={12}
          md={4}
          lg={4}
          className={classes.featureContainer}
        >
          <BasicCard title="Communications">
            <div style={{ height: 300 }}>feature</div>
          </BasicCard>
        </Grid>
        <Grid
          xs={12}
          sm={12}
          md={4}
          lg={4}
          className={classes.featureContainer}
        >
          <BasicCard title="Detect Lisks">
            <div style={{ height: 300 }}>feature</div>
          </BasicCard>
        </Grid>
      </Grid>
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
      <Header />
      <MainLandingMessage />
      <Feature />

      <Footer />
    </div>
  );
};
