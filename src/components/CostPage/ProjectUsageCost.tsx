import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
} from "@material-ui/core";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChartExample from "./ChartExample";

const useStyles = makeStyles({
  details: {
    display: "block",
  },
});

export default function ProjectUsageCost() {
  const classes = useStyles();

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item xs={4}>
            <Typography variant="h6" component="h2">
              プロジェクトの費用
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <div>
              <Typography variant="body2" color="textSecondary" component="p">
                プロジェクトの費用
              </Typography>
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="flex-start"
              >
                <AttachMoneyIcon />
                <Typography variant="h6" component="h2">
                  192.23
                </Typography>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails classes={{ root: classes.details }}>
        <ChartExample />
      </AccordionDetails>
    </Accordion>
  );
}
