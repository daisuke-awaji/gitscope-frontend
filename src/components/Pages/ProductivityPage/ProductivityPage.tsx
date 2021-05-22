import { Button, Grid } from "@material-ui/core";
import { DeveloperScoreCard } from "./DeveloperScore";
import { PullRequestTimelineCard } from "./PullRequestTimeline";
import React, { useEffect, useState } from "react";
import { RepositorySelector } from "./RepositorySelector";
import { ProductionLeadTimeCard } from "./ProductionLeadTime";
import { ActivityRatioCard } from "./ActivityRatio";
import { ScoreCards } from "./ScoreCards";
import DateRangePickerExample from "./DateRangePicker";
import { useRepositoryStatusApi } from "../../../api/useRepositoryStatus";
import { Loading } from "../../Atoms/Loading";
import { DateRange } from "materialui-daterange-picker";
import { format, sub } from "date-fns";
import { CodeAdditionRiskCard } from "./CodeAddtionRisk";
import { Link } from "react-router-dom";
import { ReactComponent as SelectRepositoryLogo } from "./SelectRepository.svg";

const { useQueryParams } = require("react-router-query-hooks");

const GoToRepositorySetting = () => {
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{ height: "50%" }}
    >
      <Grid>
        <SelectRepositoryLogo />
      </Grid>
      <Grid>
        <div>There is no github project to visualize.</div>
      </Grid>
      <Grid>
        <Link
          to="/repositories"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <Button color="primary">Go to Repository Settings</Button>
        </Link>
      </Grid>
    </Grid>
  );
};

const ProductivityPage = () => {
  const [query, { replaceQuery }] = useQueryParams();
  const { repositories, isLoading } = useRepositoryStatusApi(true);
  const repoNames = repositories.map((repo) => repo.nameWithOwner);
  const [selectedRepository, setSelectedRepository] = useState("");

  const initialDateRange = {
    startDate: sub(new Date(), { weeks: 1 }),
    endDate: new Date(),
  };
  const [dateRange, setDateRange] = React.useState<DateRange>(initialDateRange);

  const handleChange = (event: any) => {
    setSelectedRepository(event.target.value);
    replaceQuery({
      repo: event.target.value,
      startDate: query.startDate,
      endDate: query.endDate,
    });
  };

  useEffect(() => {
    const repo = query.repo || repositories[0]?.nameWithOwner;
    setSelectedRepository(repo);

    const startDateStr =
      query.startDate || format(initialDateRange.startDate, "yyyy-MM-dd");
    const endDateStr =
      query.endDate || format(initialDateRange.endDate, "yyyy-MM-dd");

    setDateRange({
      startDate: new Date(startDateStr),
      endDate: new Date(endDateStr),
    });

    replaceQuery({ repo, startDate: startDateStr, endDate: endDateStr });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repositories]);

  if (isLoading) {
    return <Loading />;
  }

  if (!repositories.length) {
    return <GoToRepositorySetting />;
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
        <DateRangePickerExample
          dateRange={dateRange}
          setDateRange={setDateRange}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={6}>
        <ScoreCards repository={selectedRepository} />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={6}>
        <ActivityRatioCard
          repository={selectedRepository}
          dateRange={dateRange}
        />
      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={12}>
        <ProductionLeadTimeCard
          repository={selectedRepository}
          dateRange={dateRange}
        />
      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={6}>
        <PullRequestTimelineCard
          repository={selectedRepository}
          dateRange={dateRange}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={6}>
        <DeveloperScoreCard repository={selectedRepository} />
      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={12}>
        <CodeAdditionRiskCard
          repository={selectedRepository}
          dateRange={dateRange}
        />
      </Grid>
    </Grid>
  );
};

export default ProductivityPage;
