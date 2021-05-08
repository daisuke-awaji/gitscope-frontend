import { Button, Divider, Grid } from "@material-ui/core";

import React from "react";
import { Fragment } from "react";
import {
  RepositoryStatus,
  useRepositoryStatusApi,
} from "../../../api/useRepositoryStatus";
import { SERVICE_NAME } from "../../../Constants";
import { Loading } from "../../Atoms/Loading";
import { BasicCard } from "../../Atoms/BasicCard";

const Repositories: React.FC<{ repositories: RepositoryStatus[] }> = (
  props
) => {
  const handleClickSetUp = (name: any) => {
    console.log(name);
  };
  const handleClickUnfollow = (name: any) => {
    console.log(name);
  };
  return (
    <Grid container spacing={2} direction="column">
      {props.repositories.map((repo: RepositoryStatus) => {
        return (
          <Fragment key={repo.nameWithOwner}>
            <Divider light />

            <Grid item container justify="space-between" alignItems="center">
              <Grid item>
                <a href={"https://github.com/" + repo.nameWithOwner}>
                  <div style={{ color: "black" }}>{repo.nameWithOwner}</div>
                </a>
              </Grid>
              <Grid item>
                {repo.followed ? (
                  <Button
                    onClick={() => handleClickUnfollow(repo.nameWithOwner)}
                  >
                    Unfollow Project
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    onClick={() => handleClickSetUp(repo.nameWithOwner)}
                  >
                    Set Up Project
                  </Button>
                )}
              </Grid>
            </Grid>
          </Fragment>
        );
      })}
    </Grid>
  );
};

export const RepositoryPage: React.FC = (): JSX.Element => {
  const { repositories, isLoading } = useRepositoryStatusApi();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <BasicCard title="Repositories">
          <div style={{ color: "gray" }}>
            {SERVICE_NAME} に連携する GitHub リポジトリを追加しましょう。
          </div>

          <Grid
            container
            style={{ marginTop: 30 }}
            spacing={2}
            direction="row"
            justify="center"
            alignItems="center"
          >
            {isLoading ? (
              <Loading />
            ) : (
              <Repositories repositories={repositories} />
            )}
          </Grid>
        </BasicCard>
      </Grid>
    </Grid>
  );
};
