import { Grid } from "@material-ui/core";
import faker from "faker";
import React from "react";
import { Legend } from "./Legend";

import { DeveloperContributions } from "./DeveloperContributions";

const generateWeeklyData = () => [
  {
    date: new Date(),
    contributionCount: {
      pullRequests: faker.random.number(5),
      commits: faker.random.number(12),
      comments: faker.random.number(30),
    },
  },
  {
    date: new Date(),
    contributionCount: {
      pullRequests: faker.random.number(5),
      commits: faker.random.number(12),
      comments: faker.random.number(30),
    },
  },
  {
    date: new Date(),
    contributionCount: {
      pullRequests: faker.random.number(5),
      commits: faker.random.number(12),
      comments: faker.random.number(30),
    },
  },
  {
    date: new Date(),
    contributionCount: {
      pullRequests: faker.random.number(5),
      commits: faker.random.number(12),
      comments: faker.random.number(30),
    },
  },
  {
    date: new Date(),
    contributionCount: {
      pullRequests: faker.random.number(5),
      commits: faker.random.number(12),
      comments: faker.random.number(30),
    },
  },
];

const allUserData = [
  {
    user: {
      name: faker.name.firstName(),
      img: `https://randomuser.me/api/portraits/${faker.helpers.randomize([
        "women",
        "men",
      ])}/${faker.random.number(60)}.jpg`,
    },
    data: generateWeeklyData(),
  },
  {
    user: {
      name: faker.name.firstName(),
      img: `https://randomuser.me/api/portraits/${faker.helpers.randomize([
        "women",
        "men",
      ])}/${faker.random.number(60)}.jpg`,
    },
    data: generateWeeklyData(),
  },
  {
    user: {
      name: faker.name.firstName(),
      img: `https://randomuser.me/api/portraits/${faker.helpers.randomize([
        "women",
        "men",
      ])}/${faker.random.number(60)}.jpg`,
    },
    data: generateWeeklyData(),
  },
  {
    user: {
      name: faker.name.firstName(),
      img: `https://randomuser.me/api/portraits/${faker.helpers.randomize([
        "women",
        "men",
      ])}/${faker.random.number(60)}.jpg`,
    },
    data: generateWeeklyData(),
  },
  {
    user: {
      name: faker.name.firstName(),
      img: `https://randomuser.me/api/portraits/${faker.helpers.randomize([
        "women",
        "men",
      ])}/${faker.random.number(60)}.jpg`,
    },
    data: generateWeeklyData(),
  },
  {
    user: {
      name: faker.name.firstName(),
      img: `https://randomuser.me/api/portraits/${faker.helpers.randomize([
        "women",
        "men",
      ])}/${faker.random.number(60)}.jpg`,
    },
    data: generateWeeklyData(),
  },
  {
    user: {
      name: faker.name.firstName(),
      img: `https://randomuser.me/api/portraits/${faker.helpers.randomize([
        "women",
        "men",
      ])}/${faker.random.number(60)}.jpg`,
    },
    data: generateWeeklyData(),
  },
  {
    user: {
      name: faker.name.firstName(),
      img: `https://randomuser.me/api/portraits/${faker.helpers.randomize([
        "women",
        "men",
      ])}/${faker.random.number(60)}.jpg`,
    },
    data: generateWeeklyData(),
  },
  {
    user: {
      name: faker.name.firstName(),
      img: `https://randomuser.me/api/portraits/${faker.helpers.randomize([
        "women",
        "men",
      ])}/${faker.random.number(60)}.jpg`,
    },
    data: generateWeeklyData(),
  },
];

export const DeveloperContributionPage: React.FC = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Legend />
      </Grid>

      <Grid item xs={12} container>
        {allUserData.map((item) => {
          return (
            <Grid xs={12}>
              <DeveloperContributions key={item.user.name} {...item} />
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};
