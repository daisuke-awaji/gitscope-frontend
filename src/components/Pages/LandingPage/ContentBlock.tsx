import { createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import React, { ReactElement } from "react";
import clsx from "clsx";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

const useContentBlockStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: "4rem",
      paddingBottom: "4rem",
    },
    firstTitle: {
      fontSize: "5rem",
      fontWeight: 800,
      paddingBottom: "0.75rem",
    },
    title: {
      fontSize: "3rem",
      fontWeight: 800,
      paddingBottom: "0.75rem",
    },
    content: {
      color: "gray",
    },
    button: {
      paddingTop: "1rem",
    },
    centerize: {
      textAlign: "center",
    },
  })
);

type ContentBlockProps = {
  first?: boolean;
  title?: string;
  content?: string;
  icon?: ReactElement;
  button?: ReactElement;
  type: "right" | "left" | "middle";
};

export const ContentBlock = (props: ContentBlockProps) => {
  if (props.type === "right") return <RightContentBlock {...props} />;
  if (props.type === "left") return <LeftContentBlock {...props} />;
  else return <MiddleContentBlock {...props} />;
};

const ContentContainer = (props: ContentBlockProps) => {
  const classes = useContentBlockStyles(props.first);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      style={{ margin: "30px" }}
    >
      <Grid xs={12}>
        <div
          className={clsx(
            props.first ? classes.firstTitle : classes.title,
            (props.type === "middle" || !matches) && classes.centerize
          )}
        >
          {props.title}
        </div>
      </Grid>
      <Grid xs={12}>
        <div
          className={clsx(
            classes.content,
            (props.type === "middle" || !matches) && classes.centerize
          )}
        >
          {props.content}
        </div>
      </Grid>
      <Grid xs={12}>
        <div className={clsx(classes.button, !matches && classes.centerize)}>
          {props?.button}
        </div>
      </Grid>
    </Grid>
  );
};

const MiddleContentBlock = (props: ContentBlockProps) => {
  const classes = useContentBlockStyles();

  return (
    <Grid container className={classes.container}>
      <Grid
        xs={12}
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <ContentContainer {...props} />
      </Grid>
      <Grid
        xs={12}
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        {props.icon}
      </Grid>
    </Grid>
  );
};

const RightContentBlock = (props: ContentBlockProps) => {
  const classes = useContentBlockStyles();

  return (
    <Grid container className={classes.container}>
      <Grid
        xs={12}
        sm={6}
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <ContentContainer {...props} />
      </Grid>
      <Grid xs={12} sm={6}>
        {props.icon}
      </Grid>
    </Grid>
  );
};
const LeftContentBlock = (props: ContentBlockProps) => {
  const classes = useContentBlockStyles();

  return (
    <Grid container className={classes.container}>
      <Grid xs={12} sm={6}>
        {props.icon}
      </Grid>
      <Grid
        xs={12}
        sm={6}
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <ContentContainer {...props} />
      </Grid>
    </Grid>
  );
};
