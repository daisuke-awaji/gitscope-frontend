import { Grid } from "@material-ui/core";
import { DeveloperScoreCard } from "./DeveloperScore";
import { PullRequestTimelineCard } from "./PullRequestTimeline";
import React, { useEffect, useState } from "react";
import { RepositorySelector } from "./RepositorySelector";
import { ProductionLeadTimeCard } from "./ProductionLeadTime";
import { ActivityRatioCard } from "./ActivityRatio";
import { ScoreCards } from "./ScoreCards";
import DateRangePickerExample from "./DateRangePicker";
import { useRepositoryStatusApi } from "../../api/useRepositoryStatus";
import { Loading } from "../Atoms/Loading";

const ProductivityPage = () => {
  const { repositories, isLoading } = useRepositoryStatusApi();
  const repoNames = repositories.map((repo) => repo.nameWithOwner);
  const [selectedRepository, setSelectedRepository] = useState("");
  const handleChange = (event: any) => {
    console.log(event);
    setSelectedRepository(event.target.value);
  };

  useEffect(() => {
    setSelectedRepository(repoNames[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <RepositorySelector
          repositories={repoNames}
          selectedRepository={selectedRepository}
          handleChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <DateRangePickerExample />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={6}>
        <ScoreCards repository={selectedRepository} />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={6}>
        <ActivityRatioCard repository={selectedRepository} />
      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={12}>
        <ProductionLeadTimeCard repository={selectedRepository} />
      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={6}>
        <PullRequestTimelineCard repository={selectedRepository} />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={6}>
        <DeveloperScoreCard repository={selectedRepository} />
      </Grid>
    </Grid>
  );
};

export default ProductivityPage;
