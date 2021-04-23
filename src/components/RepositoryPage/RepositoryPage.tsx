import { Button, Divider, Grid } from "@material-ui/core";
import faker from "faker";
import React, { useEffect, useState } from "react";
import { SERVICE_NAME } from "../../Constants";
import { BasicCard } from "../BasicCard";

const repositoriesData = [
  {
    name: "intecrb/sample_app",
    followed: false,
  },
  {
    name: "intecrb/demo_app",
    followed: true,
  },
  {
    name: "daisuke-awaji/serverless-appsync-offline-typescript-template",
    followed: false,
  },
];

for (let i = 0; i < 30; i++) {
  repositoriesData.push({
    name: faker.random.word() + "/" + faker.random.word(),
    followed: faker.random.boolean(),
  });
}

export const RepositoryPage: React.FC = () => {
  const [repositories, setRepositories] = useState(repositoriesData);
  useEffect(() => {
    setRepositories(repositoriesData);
  }, []);

  const handleClickSetUp = (name: any) => {
    console.log(name);
  };
  const handleClickUnfollow = (name: any) => {
    console.log(name);
  };
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
            direction="column"
          >
            {repositories.map((repo) => {
              return (
                <>
                  <Divider light />

                  <Grid
                    item
                    container
                    justify="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <a href={"https://github.com/" + repo.name}>
                        <div style={{ color: "black" }}>{repo.name}</div>
                      </a>
                    </Grid>
                    <Grid item>
                      {repo.followed ? (
                        <Button
                          variant="contained"
                          color="primary"
                          disableElevation
                          onClick={() => handleClickSetUp(repo.name)}
                        >
                          Set Up Project
                        </Button>
                      ) : (
                        <Button onClick={() => handleClickUnfollow(repo.name)}>
                          Unfollow Project
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </>
              );
            })}
          </Grid>
        </BasicCard>
      </Grid>
    </Grid>
  );
};
