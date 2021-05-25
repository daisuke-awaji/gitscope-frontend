import { Card, createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  CommitAnalysis,
  useCommitAnalysisApi,
} from "../../../api/useCommitAnalysisApi";
import { useRepositoryStatusApi } from "../../../api/useRepositoryStatus";
import { Loading } from "../../Atoms/Loading";
import { RepositorySelector } from "../ProductivityPage/RepositorySelector";
import { CircularProgressWithLabel } from "./CircularProgressWithLabel";
import { JobStatusColorChip } from "./JobStatusColorChip";
import { TulipIcon } from "../../Atoms/Icons/Icons";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const { useQueryParams } = require("react-router-query-hooks");

export type JobStatus = "Success" | "InProgress" | "Failuer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      padding: "20px 20px",
    },
    id: {
      fontWeight: 300,
      fontSize: 12,
    },
  })
);

type JobStatusCardProps = {} & CommitAnalysis;
const JobStatusCard: React.FC<JobStatusCardProps> = (props) => {
  const classes = useStyles();

  const commitHref = `https://github.com/${props.repositoryNameWithOwner}/commit/${props.sha}`;

  return (
    <Card elevation={0} className={classes.card} {...props}>
      <Grid container justify="space-between">
        <div className={classes.id}>
          <span>
            <a href={commitHref}>{props.sha.slice(0, 7)}</a>
          </span>
          <span style={{ paddingLeft: "1rem" }}>
            Merge pull request #2848 from branch/feature/helloworld
          </span>
        </div>
        <div>
          {props.state ? <JobStatusColorChip status={props.state} /> : null}
        </div>
      </Grid>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        style={{ paddingTop: "1rem" }}
      >
        {props.riskPoint ? (
          <CircularProgressWithLabel value={props.riskPoint} />
        ) : null}
      </Grid>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        style={{ paddingTop: "1rem" }}
      >
        <div className={classes.id}>
          <List dense={true}>
            {props.fileComplexities?.map((file) => {
              return (
                <ListItem>
                  <ListItemIcon style={{ fontWeight: 700 }}>
                    {file.complexity}
                  </ListItemIcon>
                  <ListItemText primary={file.file} />
                </ListItem>
              );
            })}
          </List>
        </div>
      </Grid>

      <Grid container direction="row" justify="flex-end" alignItems="center">
        <div className={classes.id}>{props.createdAt}</div>
      </Grid>
      {props.children}
    </Card>
  );
};

const CommitNotFound = () => {
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{ height: "50%" }}
    >
      <Grid>
        <TulipIcon />
      </Grid>
      <Grid>
        <div>No commits data.</div>
      </Grid>
    </Grid>
  );
};

const Commits: React.FC<{ repository: string }> = (props) => {
  const { commits, isLoading, setPath } = useCommitAnalysisApi({
    path: `/repos/${props.repository}/jobs`,
  });

  useEffect(() => {
    setPath(`/repos/${props.repository}/jobs`);
  }, [props.repository, setPath]);

  if (isLoading) {
    return (
      <Grid
        container
        style={{ marginTop: 30 }}
        spacing={2}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Loading />
      </Grid>
    );
  }

  if (!commits.length) {
    return (
      <Grid
        container
        style={{ marginTop: 30 }}
        spacing={2}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <CommitNotFound />
      </Grid>
    );
  }

  return (
    <Grid
      container
      style={{ marginTop: 30 }}
      spacing={2}
      direction="row"
      justify="center"
      alignItems="center"
    >
      {commits.map((item: CommitAnalysis) => {
        return (
          <Grid item xs={12}>
            <JobStatusCard {...item} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export const JobsPage: React.FC = (): JSX.Element => {
  const [query, { replaceQuery }] = useQueryParams();

  const { repositories, isLoading } = useRepositoryStatusApi(true);
  const repoNames = repositories.map((repo) => repo.nameWithOwner);
  const [selectedRepository, setSelectedRepository] = useState("");
  const handleChange = (event: any) => {
    setSelectedRepository(event.target.value);
    replaceQuery({
      repo: event.target.value,
    });
  };

  useEffect(() => {
    const repo = query.repo || repositories[0]?.nameWithOwner;
    setSelectedRepository(repo);

    replaceQuery({ repo });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repositories]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <RepositorySelector
          repositories={repoNames}
          selectedRepository={selectedRepository}
          handleChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} style={{ color: "gray", fontSize: 12 }}>
        <div>GitHub の Commit ごとに Risk Point を計測します。</div>
        <div>
          Risk Point は PullRequest
          におけるディスカッション数、ソースコードの凝集度、変更量、リードタイムをもとに算出されます。
        </div>
        <Commits repository={selectedRepository} />
      </Grid>
    </Grid>
  );
};
