import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import React from "react";

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
    <Grid container justify="space-between">
      <Grid>
        <h3>{selectedRepository}</h3>
      </Grid>
      <FormControl>
        <InputLabel id="repository-select-helper-label">Repository</InputLabel>
        <Select
          labelId="repository-select-helper-label"
          id="repository-select-helper"
          value={selectedRepository}
          onChange={handleChange}
        >
          {repositories.map((repo) => {
            return <MenuItem value={repo}>{repo}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </Grid>
  );
};
