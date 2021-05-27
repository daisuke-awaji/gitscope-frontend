import {
  Card,
  Collapse,
  createStyles,
  Grid,
  IconButton,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React from "react";
import { CommitAnalysis } from "../../../api/useCommitAnalysisApi";
import { CircularProgressWithLabel } from "./CircularProgressWithLabel";
import { JobStatusColorChip } from "./JobStatusColorChip";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import WarningIcon from "@material-ui/icons/Warning";
import CheckIcon from "@material-ui/icons/Check";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      padding: "20px 20px",
    },
    id: {
      fontWeight: 300,
      fontSize: 12,
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
  })
);

type JobStatusCardProps = {} & CommitAnalysis;
export const JobStatusCard: React.FC<JobStatusCardProps> = (props) => {
  const classes = useStyles();

  const commitHref = `https://github.com/${props.repositoryNameWithOwner}/commit/${props.sha}`;

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

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
          <span style={{ paddingLeft: "1rem" }}>{props.createdAt}</span>
        </div>
        <div>
          {props.state ? <JobStatusColorChip status={props.state} /> : null}
        </div>
      </Grid>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-end"
        style={{ paddingTop: "1rem" }}
      >
        {props.riskPoint ? (
          <CircularProgressWithLabel value={props.riskPoint} />
        ) : null}
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: open,
          })}
          onClick={handleClick}
          aria-expanded={open}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </Grid>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          style={{ paddingTop: "1rem" }}
        >
          <List dense={true}>
            {props.fileComplexities?.map((file) => {
              return (
                <ListItem>
                  <ListItemIcon style={{ fontWeight: 700 }}>
                    {file.complexity > 12 ? (
                      <WarningIcon style={{ color: "orange" }} />
                    ) : (
                      <CheckIcon color="secondary" />
                    )}
                  </ListItemIcon>
                  <ListItemIcon style={{ fontWeight: 700 }}>
                    {file.complexity}
                  </ListItemIcon>
                  <ListItemText primary={file.file} />
                </ListItem>
              );
            })}
          </List>
        </Grid>
      </Collapse>

      {props.children}
    </Card>
  );
};
