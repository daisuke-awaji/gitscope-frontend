import { Button, Divider, Grid } from "@material-ui/core";

import React, { useEffect, useState } from "react";
import { createClient } from "../../api/client";
import { useAuth } from "../../AuthProvider";
import { SERVICE_NAME } from "../../Constants";
import { BasicCard } from "../BasicCard";

type RepositoryStatus = {
  nameWithOwner: string;
  url: string;
  followed: boolean;
};

export const RepositoryPage: React.FC = () => {
  const [repositories, setRepositories] = useState<RepositoryStatus[]>([]);
  const { user } = useAuth();
  useEffect(() => {
    const fetch = async (token: string) => {
      const client = createClient(token);
      const res = await client.get("/repos");
      console.log(res);
      setRepositories(res.data);
    };
    if (user) fetch(user.token);
    // eslint-disable-next-line
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
                      <a href={"https://github.com/" + repo.nameWithOwner}>
                        <div style={{ color: "black" }}>
                          {repo.nameWithOwner}
                        </div>
                      </a>
                    </Grid>
                    <Grid item>
                      {repo.followed ? (
                        <Button
                          onClick={() =>
                            handleClickUnfollow(repo.nameWithOwner)
                          }
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
                </>
              );
            })}
          </Grid>
        </BasicCard>
      </Grid>
    </Grid>
  );
};
