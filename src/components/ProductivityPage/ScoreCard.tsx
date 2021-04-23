import { makeStyles, Theme, createStyles } from "@material-ui/core";
import React from "react";
import { BasicCard, BasicCardProps } from "../BasicCard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    scoreContainer: {
      paddingTop: 20,
      paddingBottom: 20,
    },
    scoreFont: {
      fontSize: 50,
      fontWeight: 700,
    },
    unit: {
      fontSize: 15,
    },
    ratio: {
      fontSize: 20,
    },
    ratioDescription: {
      color: "gray",
    },
  })
);

type ScoreCardProps = BasicCardProps & {
  score: string;
  unit: string;
  ratio: string;
  chip?: string;
};
export const ScoreCard: React.FC<ScoreCardProps> = (props) => {
  const classes = useStyles();

  return (
    <BasicCard title={props.title} chip={props.chip}>
      <div className={classes.scoreContainer}>
        <span className={classes.scoreFont}>{props.score}</span>
        <span className={classes.unit}>{props.unit}</span>
      </div>
      <div>
        <span
          style={
            props.ratio.startsWith("-") ? { color: "red" } : { color: "green" }
          }
          className={classes.ratio}
        >
          {props.ratio}%
        </span>
        <span> </span>
        <span className={classes.ratioDescription}>Since last week</span>
      </div>
    </BasicCard>
  );
};
