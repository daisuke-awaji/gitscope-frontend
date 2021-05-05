import { Grid } from '@material-ui/core';
import { DeveloperScoreCard } from './DeveloperScore';
import { PullRequestTimelineCard } from './PullRequestTimeline';
import React, { useEffect, useState } from 'react';
import { RepositorySelector } from './RepositorySelector';
import { ProductionLeadTimeCard } from './ProductionLeadTime';
import { ActivityRatioCard } from './ActivityRatio';
import { ScoreCards } from './ScoreCards';
import DateRangePickerExample from './DateRangePicker';
import { useRepositoryStatusApi } from '../../api/useRepositoryStatus';
import { Loading } from '../Atoms/Loading';
import { DateRange } from 'materialui-daterange-picker';
import { sub } from 'date-fns';
import { CodeAdditionRiskCard } from './CodeAddtionRisk';
const { useQueryParams } = require('react-router-query-hooks');

const ProductivityPage = () => {
  const [query, { replaceQuery }] = useQueryParams();
  console.log(query);

  const { repositories, isLoading } = useRepositoryStatusApi();
  const repoNames = repositories.map((repo) => repo.nameWithOwner);
  const [selectedRepository, setSelectedRepository] = useState('');

  const initialDateRange = {
    startDate: sub(new Date(), { months: 1 }),
    endDate: new Date(),
  };
  const [dateRange, setDateRange] = React.useState<DateRange>(initialDateRange);

  const handleChange = (event: any) => {
    setSelectedRepository(event.target.value);
    replaceQuery({ repo: event.target.value });
  };

  useEffect(() => {
    const repo = query.repo || repoNames[0];
    setSelectedRepository(repo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repositories]);

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
