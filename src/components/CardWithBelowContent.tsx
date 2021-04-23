import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    padding: "20px 20px",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  text: {
    marginBottom: 12,
  },
});
type CardWithBelowContentProps = {
  title: string;
  subTitle?: string;
};

export const CardWithBelowContent: React.FC<CardWithBelowContentProps> = ({
  title,
  subTitle,
  children,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Typography variant="h6" component="h2" className={classes.text}>
        {title}
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        component="p"
        className={classes.text}
      >
        {subTitle}
      </Typography>
      {children}
    </Card>
  );
};
