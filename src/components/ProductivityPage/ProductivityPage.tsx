import { Grid } from "@material-ui/core";
import { DeveloperScoreCard } from "./DeveloperScore";
import { PullRequestTimelineCard } from "./PullRequestTimeline";
import React, { useState } from "react";
import { RepositorySelector } from "./RepositorySelector";
import { ProductionLeadTimeCard } from "./ProductionLeadTime";
import { ActivityRatioCard } from "./ActivityRatio";
import { ScoreCards } from "./ScoreCards";
import DateRangePickerExample from "./DateRangePicker";

const repositoies = [
  "intecrb/sample_app",
  "intecrb/demo_app",
  "daisuke-awaji/qiitaScraper",
  "daisuke-awaji/serverless-appsync-offline-typescript-template",
];

const ProductivityPage = () => {
  const [repo, setRepo] = useState(repositoies[0]);
  const handleChange = (event: any) => {
    setRepo(event.target.value);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <RepositorySelector
          repositories={repositoies}
          selectedRepository={repo}
          handleChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <DateRangePickerExample />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={6}>
        <ScoreCards repository={repo} />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={6}>
        <ActivityRatioCard repository={repo} />
      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={12}>
        <ProductionLeadTimeCard repository={repo} />
      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={6}>
        <PullRequestTimelineCard repository={repo} />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={6}>
        <DeveloperScoreCard repository={repo} />
      </Grid>
    </Grid>
  );
};

export default ProductivityPage;
