import { Grid } from "@material-ui/core";
import faker from "faker";
import React from "react";
import { ScoreCard } from "./ScoreCard";

type ScoreCardsProps = { repository: string };
export const ScoreCards: React.FC<ScoreCardsProps> = ({ repository }) => {
  console.log(repository);

  const scoreData = [
    {
      title: "Productivity",
      score: faker.random.number(100).toString(),
      unit: "",
      ratio: faker.random.number({ min: -100, max: 100 }).toString(),
      chip: "today",
    },
    {
      title: "Efficiency",
      score: faker.random.number(100).toString(),
      unit: "",
      ratio: faker.random.number({ min: -100, max: 100 }).toString(),
      chip: "1 week",
    },
    {
      title: "Activity",
      score: faker.random.number(100).toString(),
      unit: "",
      ratio: faker.random.number({ min: -100, max: 100 }).toString(),
      chip: "1 week",
    },
    {
      title: "Milestone",
      score: faker.random.number(100).toString(),
      unit: "",
      ratio: faker.random.number({ min: -100, max: 100 }).toString(),
      chip: "1 week",
    },
  ];
  return (
    <Grid container spacing={2}>
      {scoreData.map((item) => {
        return (
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <ScoreCard
              title={item.title}
              score={item.score}
              unit={item.unit}
              ratio={item.ratio}
              chip={item.chip}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};
