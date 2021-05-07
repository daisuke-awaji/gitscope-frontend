import { Card, createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import faker from "faker";
import React, { useEffect, useState } from "react";
import { CircularProgressWithLabel } from "./CircularProgressWithLabel";
import { JobStatusColorChip } from "./JobStatusColorChip";
export type JobStatus = "Success" | "InProgress" | "Failuer";

type Job = {
  id: string;
  status: JobStatus;
  createdAt: string;
  riskPoint: number;
  branch: string;
  commitId: string;
  commitMessage: string;
};
const data: Job[] = [];
for (let i = 0; i < 10; i++) {
  data.push({
    id: faker.random.uuid(),
    status: faker.random.arrayElement<JobStatus>([
      "Success",
      "Success",
      "Success",
      "Success",
      "Success",
      "Success",
      "Failuer",
      "InProgress",
    ]),
    createdAt: faker.date.between("2010-01-01", "2022-01-01").toISOString(),
    riskPoint: faker.random.number(100),
    branch:
      faker.random.word() +
      "/" +
      faker.random.word() +
      "/" +
      faker.random.word(),
    commitId: faker.random.uuid(),
    commitMessage: faker.random.words(10),
  });
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      padding: "20px 20px",
    },
    id: {
      fontWeight: 300,
      fontSize: 10,
    },
  })
);

type JobStatusCardProps = {} & Job;
const JobStatusCard: React.FC<JobStatusCardProps> = (props) => {
  const classes = useStyles();

  return (
    <Card elevation={0} className={classes.card} {...props}>
      <Grid container justify="space-between">
        <div className={classes.id}>{props.id}</div>
        <div>
          {props.status ? <JobStatusColorChip status={props.status} /> : null}
        </div>
      </Grid>
      <Grid container direction="row" justify="flex-start" alignItems="center">
        <CircularProgressWithLabel value={props.riskPoint} />
      </Grid>
      <Grid container direction="row" justify="flex-start" alignItems="center">
        <div className={classes.id}>{props.branch}</div>
      </Grid>

      <Grid container>
        <div className={classes.id}>{props.commitId}</div>
        <div className={classes.id}>{props.commitMessage}</div>
      </Grid>
      <Grid container>
        <div className={classes.id}>{props.createdAt}</div>
      </Grid>
      {props.children}
    </Card>
  );
};

export const JobsPage: React.FC = (): JSX.Element => {
  const [jobs, setJobs] = useState<Job[]>(data);
  useEffect(() => {
    setJobs(data);
  }, []);

  return (
    <Grid container spacing={2}>
      {jobs.map((item: Job) => {
        return (
          <Grid item xs={12}>
            <JobStatusCard {...item} />
          </Grid>
        );
      })}
    </Grid>
  );
};
