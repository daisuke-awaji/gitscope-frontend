import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {
  CircularProgressProps,
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core";

// Inspired by the former Facebook spinners.
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "relative",
    },
    bottom: {
      color: theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
    },
    top: {
      color: "#1a90ff",
      animationDuration: "550ms",
      position: "absolute",
      left: 0,
    },
    circle: {
      strokeLinecap: "round",
    },
  })
);

const GrayBottomCircular: React.FC<C> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress
        variant="determinate"
        className={classes.bottom}
        size={50}
        thickness={5}
        value={100}
      />

      <CircularProgress
        variant="determinate"
        disableShrink
        className={classes.top}
        classes={{
          circle: classes.circle,
        }}
        size={50}
        thickness={5}
        {...props}
      />
    </div>
  );
};

const RiskPointCircule: React.FC<C> = (props) => {
  const theme = useTheme();
  let color = theme.palette.primary.main;

  if (props.value > 80) {
    color = theme.palette.error.main;
  } else if (props.value > 50) {
    color = theme.palette.warning.dark;
  } else if (props.value > 40) {
    color = theme.palette.warning.light;
  }
  return <GrayBottomCircular style={{ color }} {...props} />;
};

type C = CircularProgressProps & { value: number };
export const CircularProgressWithLabel: React.FC<C> = (props) => {
  return (
    <Box position="relative" display="inline-flex">
      <RiskPointCircule {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="body1"
          component="div"
          color="textSecondary"
        >{`${Math.round(props.value)}p`}</Typography>
      </Box>
    </Box>
  );
};
