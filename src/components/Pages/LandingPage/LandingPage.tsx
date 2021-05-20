import {
  Container,
  createStyles,
  CssBaseline,
  Grid,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React from "react";
import { SERVICE_NAME } from "../../../Constants";
import { DeveloperFlow } from "../../Atoms/DeveloperFlow";
import {
  GitHubLoginButton,
  StartWithGitHubLoginButton,
} from "../../Atoms/GitHubLoginButton";
import { SupportedLaunguage } from "../../Atoms/SupportedLaunguage";
import { Discussion, Risk } from "../../Lottie/LottieAnimation";
import PullRequestLeadTimeDemoLottie from "../../Lottie/PullRequestLeadTimeDemoLottie";
import VisualizeTeamProductivityLottie from "../../Lottie/VisualizeTeamProductivityLottie";
import { ContentBlock } from "./ContentBlock";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: 10,
      backgroundImage:
        // 'linear-gradient(to right top, #ffffff, #ebeeff, #cde1ff, #a2d6ff, #63ccff);',
        "linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)",
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
    footer: {
      background: "gray",
      height: 100,
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

      <Container maxWidth="md">
        <Header />
        <ContentBlock
          type="right"
          first={true}
          title={"Minimize Lead Time"}
          content={
            "Start analyze GitHub Repository. GitScope makes it easy to visualize your product team's verocity, productivity and risk."
          }
          icon={<VisualizeTeamProductivityLottie />}
          button={<StartWithGitHubLoginButton />}
        />

        <ContentBlock
          type="middle"
          title={"Only Push, Analyze Everything"}
          content={`You just push the source code to your GitHub repository. 
            No complicated setting work is required.
            All actions taken on GitHub are automatically analyzed by GitScope.`}
          icon={
            <div style={{ width: "80%" }}>
              <DeveloperFlow />
            </div>
          }
        />

        <ContentBlock
          type="middle"
          title={"Language Support"}
          content={`We plan to increase the number of supported languages ​​in the future.`}
          icon={
            <div style={{ width: "80%" }}>
              <SupportedLaunguage />
            </div>
          }
        />

        <ContentBlock
          type="right"
          title={"GitHub Analytics"}
          content={`The lead-time metric gives you an idea of how many times (usually in
              days) pull requests take to be merged or closed. This metric is
              especially useful for raising questions and start investigations
              before it’s too late. A good practice is to measure this number over
              time so that you can spot trends and behaviors more pragmatically.`}
          icon={<PullRequestLeadTimeDemoLottie />}
        />

        <ContentBlock
          type="left"
          title={"Discussions"}
          content={`Measuring the number of comments and reactions for each pull request gives you an idea of how your team collaborates. Collaboration is great, and as leaders, we want to endorse it. However, after a certain level, discussions slow down development`}
          icon={<Discussion />}
        />

        <ContentBlock
          type="right"
          title={"Detect Risk"}
          content={`Frequently modified sources lead to bugs. Identify files that are susceptible to change, and identify high-risk changes based on the percentage of discussions in the Pull Request.`}
          icon={<Risk />}
        />
      </Container>

      <Footer />
    </div>
  );
};
