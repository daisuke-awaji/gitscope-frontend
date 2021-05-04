import {
  createStyles,
  CssBaseline,
  Grid,
  makeStyles,
  Theme,
} from '@material-ui/core';
import React from 'react';
import { SERVICE_NAME } from '../../Constants';
import {
  GitHubLoginButton,
  StartWithGitHubLoginButton,
} from '../GitHubLoginButton';
import { Discussion, Risk } from '../Lottie/LottieAnimation';
import PullRequestLeadTimeDemoLottie from '../Lottie/PullRequestLeadTimeDemoLottie';
import VisualizeTeamProductivityLottie from '../Lottie/VisualizeTeamProductivityLottie';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: 10,
      backgroundImage:
        // 'linear-gradient(to right top, #ffffff, #ebeeff, #cde1ff, #a2d6ff, #63ccff);',
        'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)',
    },
    header: {
      fontWeight: 800,
      paddingLeft: 30,
      paddingRight: 30,
    },
    logo: {
      width: 35,
      marginRight: 10,
    },
    serviceTitle: {
      fontSize: 20,
    },
    landingMessage: {
      // color: 'white',
      marginTop: '8vh',
      fontSize: 'clamp(5vw, 100px, 10vw)',
      fontWeight: 800,
      paddingLeft: 30,
      paddingRight: 30,
    },
    feature: {
      minHeight: 600,
    },
    featureContainer: {
      padding: 30,
    },
    featureTitle: {
      fontSize: 30,
      fontWeight: 500,
      minHeight: 50,
    },
    featureDescription: {
      color: 'gray',
      minHeight: 100,
    },
    featureAnimationContainer: {
      minHeight: 300,
    },
    footer: {
      background: 'gray',
      height: 100,
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

  const FeatureChild: React.FC<{
    title: string;
    description: string;
    anime: React.ReactElement;
  }> = (props) => {
    const { title, description, anime } = props;
    return (
      <div style={{ minHeight: 300, textAlign: 'center' }}>
        <div className={classes.featureTitle}>{title}</div>
        <div className={classes.featureDescription}>{description}</div>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.featureAnimationContainer}
        >
          {anime}
        </Grid>
      </div>
    );
  };

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
        xs={12}
        sm={12}
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        style={{ paddingTop: 50, paddingBottom: 50 }}
      >
        <StartWithGitHubLoginButton />
      </Grid>

      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        xs={12}
        sm={12}
      >
        <Grid
          xs={12}
          sm={12}
          md={4}
          lg={4}
          className={classes.featureContainer}
        >
          <FeatureChild
            title="GitHub Analytics"
            description="The lead-time metric gives you an idea of how many times (usually in
          days) pull requests take to be merged or closed. This metric is
          especially useful for raising questions and start investigations
          before it’s too late. A good practice is to measure this number over
          time so that you can spot trends and behaviors more pragmatically."
            anime={<PullRequestLeadTimeDemoLottie />}
          />
        </Grid>
        <Grid
          xs={12}
          sm={12}
          md={4}
          lg={4}
          className={classes.featureContainer}
        >
          <FeatureChild
            title="Discussions"
            description="Measuring the number of comments and reactions for each pull request gives you an idea of how your team collaborates. Collaboration is great, and as leaders, we want to endorse it. However, after a certain level, discussions slow down development."
            anime={<Discussion />}
          />
        </Grid>
        <Grid
          xs={12}
          sm={12}
          md={4}
          lg={4}
          className={classes.featureContainer}
        >
          <FeatureChild
            title="Detect Risk"
            description="Frequently modified sources lead to bugs. Identify files that are susceptible to change, and identify high-risk changes based on the percentage of discussions in the Pull Request."
            anime={<Risk />}
          />
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
      ©️ {new Date().getFullYear()} GitScope, Designed by Awaji Daisuke.
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
