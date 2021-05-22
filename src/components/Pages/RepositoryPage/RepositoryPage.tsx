import { Button, Divider, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

import React from "react";
import { Fragment } from "react";
import {
  RepositoryStatus,
  useRepositoryStatusApi,
} from "../../../api/useRepositoryStatus";
import { SERVICE_NAME } from "../../../Constants";
import { Loading } from "../../Atoms/Loading";
import { BasicCard } from "../../Atoms/BasicCard";
import { useRepositorySettingApi } from "../../../api/useRepositorySettingApi";

const Repositories: React.FC<{
  repositories: RepositoryStatus[];
  setRepositories: any;
}> = (props) => {
  const { save } = useRepositorySettingApi();
  const handleClickUnfollow = (name: any) => {
    console.log(name);
    save({
      nameWithOwner: name,
      followed: false,
    }).then(() => {
      const newRepositories: RepositoryStatus[] = props.repositories.map(
        (repositoryStatus) => {
          if (repositoryStatus.nameWithOwner === name) {
            return {
              nameWithOwner: name,
              url: repositoryStatus.url,
              followed: !repositoryStatus.followed,
            };
          }
          return repositoryStatus;
        }
      );
      props.setRepositories(newRepositories);
    });
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
                  <Link
                    to={`/repositories/${encodeURIComponent(
                      repo.nameWithOwner
                    )}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      disableElevation
                    >
                      Set Up Project
                    </Button>
                  </Link>
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
  const { repositories, setRepositories, isLoading } = useRepositoryStatusApi();

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
              <Repositories
                repositories={repositories}
                setRepositories={setRepositories}
              />
            )}
          </Grid>
        </BasicCard>
      </Grid>
    </Grid>
  );
};
