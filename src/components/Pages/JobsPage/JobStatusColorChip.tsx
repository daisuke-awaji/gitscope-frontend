import { Chip, withStyles } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import React from "react";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import { JobStatus } from "./JobsPage";

const SuccessColorChip = withStyles((theme) => ({
  root: {
    color: "#ffffff",
    backgroundColor: theme.palette.success.main,
  },
}))(Chip);
const InProgressColorChip = withStyles((theme) => ({
  root: {
    color: theme.palette.warning.contrastText,
    backgroundColor: theme.palette.warning.light,
  },
}))(Chip);
const FailuerColorChip = withStyles((theme) => ({
  root: {
    color: theme.palette.error.contrastText,
    backgroundColor: theme.palette.error.main,
  },
}))(Chip);

export const JobStatusColorChip: React.FC<{ status: JobStatus }> = (props) => {
  if (props.status === "Success") {
    return (
      <SuccessColorChip
        label={props.status}
        size="small"
        icon={<CheckIcon style={{ color: "white" }} />}
      />
    );
  } else if (props.status === "InProgress") {
    return (
      <InProgressColorChip
        label={props.status}
        size="small"
        icon={<AutorenewIcon />}
      />
    );
  } else {
    return (
      <FailuerColorChip
        label={props.status}
        size="small"
        icon={<ErrorOutlineIcon style={{ color: "white" }} />}
      />
    );
  }
};
