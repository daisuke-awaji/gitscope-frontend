import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import React from "react";
import { RepositoryNameWithGitHubIcon } from "../RepositoryPage/RepositorySetting";

type RepositorySelectorProps = {
  repositories: string[];
  selectedRepository: string;
  handleChange: any;
};

export const RepositorySelector: React.FC<RepositorySelectorProps> = (
  props
) => {
  const { repositories, selectedRepository, handleChange } = props;
  return (
    <Grid container justify="space-between" alignItems="flex-end">
      <Grid>
        <RepositoryNameWithGitHubIcon
          repositoryNameWithOwner={selectedRepository}
        />
      </Grid>
      <Grid>
        <FormControl>
          <InputLabel id="repository-select-helper-label">
            Repository
          </InputLabel>
          <Select
            labelId="repository-select-helper-label"
            id="repository-select-helper"
            value={selectedRepository}
            onChange={handleChange}
          >
            {repositories.map((repo, index) => {
              return (
                <MenuItem value={repo} key={index}>
                  {repo}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};
