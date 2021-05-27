import { Card, Grid } from "@material-ui/core";
import React from "react";
import { CommitAnalysis } from "../../../api/useCommitAnalysisApi";
import { CircularProgressWithLabel } from "./CircularProgressWithLabel";
import { JobStatusColorChip } from "./JobStatusColorChip";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useStyles } from "./JobsPage";

type JobStatusCardProps = {} & CommitAnalysis;
export const JobStatusCard: React.FC<JobStatusCardProps> = (props) => {
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
