import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  CommitAnalysis,
  useCommitAnalysisApi,
} from "../../../api/useCommitAnalysisApi";
import { Loading } from "../../Atoms/Loading";
import { RepositorySelector } from "../ProductivityPage/RepositorySelector";
import { TulipIcon } from "../../Atoms/Icons/Icons";
import { useRepositories } from "../../../RepositoryProvider";
import { JobStatusCard } from "./JobStatusCard";
import Backdrop from "../../Atoms/SimpleBackDrop";

const { useQueryParams } = require("react-router-query-hooks");

export type JobStatus = "Success" | "InProgress" | "Failuer";

const CommitNotFound = () => {
  return (
    <Grid container direction="column" justify="center" alignItems="center">
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

  const GridContainer: React.FC = (props) => {
    return (
      <Grid
        container
        style={{ marginTop: 30 }}
        spacing={2}
        direction="row"
        justify="center"
        alignItems="center"
      >
        {props.children}
      </Grid>
    );
  };

  if (isLoading) {
    return (
      <GridContainer>
        <Loading />
      </GridContainer>
    );
  }

  if (!commits.length) {
    return (
      <GridContainer>
        <CommitNotFound />
      </GridContainer>
    );
  }

  return (
    <GridContainer>
      {commits.map((item: CommitAnalysis) => {
        return (
          <Grid item xs={12}>
            <JobStatusCard {...item} />
          </Grid>
        );
      })}
    </GridContainer>
  );
};

export const JobsPage: React.FC = (): JSX.Element => {
  const [query, { replaceQuery }] = useQueryParams();

  const { repositories, isLoading } = useRepositories();
  const followedRepositories = repositories.filter((repo) => repo.followed);

  const [selectedRepository, setSelectedRepository] = useState(
    query.repo || followedRepositories[0]?.nameWithOwner
  );
  const handleChange = (event: any) => {
    setSelectedRepository(event.target.value);
    replaceQuery({
      repo: event.target.value,
    });
  };

  useEffect(() => {
    setSelectedRepository(query.repo || followedRepositories[0]?.nameWithOwner);
    replaceQuery({ repo: selectedRepository });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repositories]);

  if (isLoading) {
    return <Backdrop />;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <RepositorySelector
          repositories={followedRepositories.map((repo) => repo.nameWithOwner)}
          selectedRepository={selectedRepository}
          handleChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} style={{ color: "gray", fontSize: 12 }}>
        <div>GitHub ??? Commit ????????? Risk Point ?????????????????????</div>
        <div>
          Risk Point ??? PullRequest
          ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
        </div>
        <Commits repository={selectedRepository} />
      </Grid>
    </Grid>
  );
};
