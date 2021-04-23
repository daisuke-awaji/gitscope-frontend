import { makeStyles, Theme, createStyles, Chip, Grid } from "@material-ui/core";
import Card, { CardProps } from "@material-ui/core/Card";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      padding: "20px 20px",
    },
    title: {
      fontWeight: 800,
      fontSize: 20,
    },
  })
);

export type BasicCardProps = {
  title: string;
  chip?: string;
} & CardProps;
export const BasicCard: React.FC<BasicCardProps> = (props) => {
  const classes = useStyles();
  return (
    <Card className={classes.card} {...props}>
      <Grid container justify="space-between">
        <div className={classes.title}>{props.title}</div>
        {props.chip ? <Chip color="primary" label={props.chip} /> : null}
      </Grid>

      {props.children}
    </Card>
  );
};
