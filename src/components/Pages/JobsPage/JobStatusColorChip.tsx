import { Chip, makeStyles, withStyles } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import React from "react";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import { CommitState } from "../../../api/useCommitAnalysisApi";

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

const useStyles = makeStyles({
  rotate: {
    animation: "$spin infinite 1.5s linear",
    height: "40vmin",
    pointerEvents: "none",
  },
  "@keyframes spin": {
    from: {
      transform: "rotate(0deg)",
    },
    to: {
      transform: "rotate(360deg)",
    },
  },
});

export const JobStatusColorChip: React.FC<{ status: CommitState }> = (
  props
) => {
  const classes = useStyles();

  if (props.status === "success") {
    return (
      <SuccessColorChip
        label={props.status}
        size="small"
        icon={<CheckIcon style={{ color: "white" }} />}
      />
    );
  } else if (props.status === "pending") {
    return (
      <InProgressColorChip
        label={props.status}
        size="small"
        icon={<AutorenewIcon className={classes.rotate} />}
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
