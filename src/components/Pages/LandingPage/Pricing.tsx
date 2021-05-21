import {
  Button,
  Card,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core";
import clsx from "clsx";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    priceCard: {
      textAlign: "center",
      height: "20rem",
      width: "13rem",
    },
    colorBar: {
      height: "1rem",
      backgroundColor: "gray",
    },
    description: {
      color: "gray",
      fontSize: "0.5rem",
    },
    priceInformation: {
      color: "gray",
      fontSize: "0.9rem",
      paddingTop: "1.0rem",
    },

    features: {
      paddingTop: "1rem",
      fontSize: "0.5rem",
      textAlign: "left",
    },
    button: {
      marginTop: "1rem",
      width: "8rem",
      fontSize: "0.5rem",
      fontWeight: 800,
      color: "white",
    },
  })
);

type PriceCardProps = {
  color: "primary" | "gray";
  title: string;
  description?: string;
  priceInformation?: string;
  buttonText?: string;
  features?: string[];
};
const PriceCard = (props: PriceCardProps) => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Card className={classes.priceCard}>
      <div
        className={clsx(classes.colorBar)}
        style={{
          backgroundColor:
            props.color === "primary"
              ? theme.palette.primary.main
              : props.color,
        }}
      ></div>
      <h2>{props.title}</h2>
      <div className={clsx(classes.description)}>{props?.description}</div>
      <div className={clsx(classes.priceInformation)}>
        {props?.priceInformation}
      </div>

      <Button
        variant="contained"
        className={classes.button}
        style={{
          backgroundColor:
            props.color === "primary"
              ? theme.palette.primary.main
              : props.color,
        }}
      >
        {props.buttonText}
      </Button>

      <ul className={classes.features}>
        {props.features?.map((feature) => {
          return <li key={feature}>{feature}</li>;
        })}
      </ul>
    </Card>
  );
};

export const Pricing = () => {
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      <Grid
        xs={12}
        sm={4}
        item
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <PriceCard
          color="primary"
          title="Free"
          description="Start with and gradually expand the scale"
          priceInformation="$0 per month"
          buttonText="Start Analyzing"
          features={[
            "View Dashboard",
            "30 analyze build credits/week",
            "Run 1 job at a time",
          ]}
        />
      </Grid>
      <Grid
        xs={12}
        sm={4}
        item
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <PriceCard
          color="gray"
          title="Performance"
          description="Not yet available. Under development."
          priceInformation="Starting at $30 per month"
          buttonText="Work in progress..."
          features={[
            "Scale up to 10x concurrency",
            "No limitation for analyze build",
          ]}
        />
      </Grid>
      <Grid
        xs={12}
        sm={4}
        item
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <PriceCard
          color="gray"
          title="Enterprise"
          description="Not yet available. Under development."
          priceInformation="Custom pricing"
          buttonText="Work in progress..."
          features={["Self-hosted runners"]}
        />
      </Grid>
    </Grid>
  );
};
