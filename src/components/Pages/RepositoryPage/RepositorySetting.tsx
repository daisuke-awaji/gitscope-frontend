import { useState } from "react";
import { useLocation } from "react-router-dom";
import React from "react";
import { CodeHighLightEditor } from "./CodeHightLightEditor";
import { createStyles, Grid, makeStyles, Button } from "@material-ui/core";
import { Theme } from "@material-ui/core";
import { BasicCard } from "../../Atoms/BasicCard";
import { GitHubIcon, InfoIcon } from "../../Atoms/Icons/Icons";
import { useRepositorySettingApi } from "../../../api/useRepositorySettingApi";

const useRepositoryNameWithGitHubStyles = makeStyles((theme: Theme) =>
  createStyles({
    repository: {
      fontSize: 20,
      fontWeight: 800,
      marginLeft: 10,
    },
  })
);

const RepositoryNameWithGitHubIcon: React.FC<{
  repositoryNameWithOwner: string;
}> = (props) => {
  const classes = useRepositoryNameWithGitHubStyles();

  return (
    <Grid container direction="row" justify="flex-start" alignItems="center">
      <GitHubIcon />
      <div className={classes.repository}>{props.repositoryNameWithOwner}</div>
    </Grid>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    infomationBoxContainer: {
      marginTop: "1rem",
      marginBottom: "1rem",
      fontSize: 16,
    },
    infomationIcon: {
      width: "1.5rem",
      marginRight: "1rem",
    },
    highlight: {
      color: theme.palette.primary.main,
      fontWeight: 600,
    },
    repoLink: {
      color: theme.palette.primary.main,
      fontWeight: 600,
      textDecoration: "none",
    },
    buttonContainer: {
      marginTop: "1rem",
    },
  })
);

export const RepositorySetting = () => {
  const location = useLocation();
  const classes = useStyles();

  const { save } = useRepositorySettingApi();

  const [code, setCode] = useState(`{
    "target": "/**/*.{js,ts}",
    "threshold": 12\n}`);

  const repositoryNameWithOwner = decodeURIComponent(
    location.pathname.split("/")[2]
  );

  const configFileName = ".gitscope.config.json";

  const handleClickCreateConfigButton = () => {
    save({
      nameWithOwner: repositoryNameWithOwner,
      followed: true,
      config: code,
    }).then((result) => {
      window.location.assign("/jobs");
    });
  };

  return (
    <BasicCard>
      <RepositoryNameWithGitHubIcon
        repositoryNameWithOwner={repositoryNameWithOwner}
      />

      <div className={classes.infomationBoxContainer}>
        <InformationBox>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <InfoIcon className={classes.infomationIcon} />
            <Grid xs={11}>
              We’ll commit the{" "}
              <span className={classes.highlight}>{configFileName}</span> below
              to{" "}
              <span className={classes.highlight}>
                <a
                  href={"https://github.com/" + repositoryNameWithOwner}
                  className={classes.repoLink}
                >
                  {repositoryNameWithOwner}
                </a>
              </span>{" "}
              on a new branch called{" "}
              <span className={classes.highlight}>gitscope-setup</span>. If you
              prefer, you can use an existing config.
            </Grid>
          </Grid>
        </InformationBox>
      </div>

      <CodeHighLightEditor code={code} setCode={setCode} />
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        className={classes.buttonContainer}
      >
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={handleClickCreateConfigButton}
        >
          Create config on Pull Request
        </Button>
      </Grid>
    </BasicCard>
  );
};

const useInformationBoxStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      border: "solid 0.5px",
      borderColor: "#ced4da",
      outline: 1,
      padding: "1rem",
    },
  })
);

const InformationBox: React.FC = (props) => {
  const classes = useInformationBoxStyles();
  return <div className={classes.box}>{props.children}</div>;
};
