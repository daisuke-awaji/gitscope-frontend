import React, { useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import theme from '../../theme';
import faker from 'faker';
import { BasicCard } from '../BasicCard';
import { usePullRequestsPerDayApi } from '../../api/usePullReqeustsPerDayApi';
import { Loading } from '../Atoms/Loading';
import { Grid } from '@material-ui/core';
import { DateRange } from 'materialui-daterange-picker';
import { format } from 'date-fns';
import * as querystring from 'querystring';

type PullRequestTimelineProps = { repository: string; dateRange: DateRange };

export const PullRequestTimelineCard: React.FC<PullRequestTimelineProps> = (
  props,
) => {
  return (
    <BasicCard title="Pull Request timeline">
      <div style={{ color: 'gray' }}>
        {faker.random.arrayElement(['マージされた Pull Request の数の推移'])}
      </div>
      <PullRequestTimeline {...props} />
    </BasicCard>
  );
};

const PullRequestTimeline: React.FC<PullRequestTimelineProps> = ({
  repository,
  dateRange,
}) => {
  const startDateString = dateRange.startDate
    ? format(dateRange.startDate, 'yyyy-MM-dd')
    : undefined;
  const endDateString = dateRange.endDate
    ? format(dateRange.endDate, 'yyyy-MM-dd')
    : undefined;

  const qs = querystring.stringify({ startDateString, endDateString });
  const path = `/repos/${repository}/prsPerDay?${qs}`;
  const { prs, isLoading, setPath } = usePullRequestsPerDayApi({
    path,
  });
  useEffect(() => {
    setPath(path);
  }, [setPath, path]);

  const data = prs
    .sort(
      (a, b) => new Date(a.mergedAt).getTime() - new Date(b.mergedAt).getTime(),
    )
    .map((pr) => [pr.mergedAt, pr.count]);

  if (isLoading) {
    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ height: 300 }}
      >
        <Loading />
      </Grid>
    );
  }

  const options = {
    xAxis: {
      type: 'category',
      boundaryGap: true,
    },
    yAxis: {
      type: 'value',
    },
    tooltip: {
      trigger: 'axis',
    },
    toolbox: {
      show: true,
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    legend: {
      top: 0,
      data: [repository],
    },
    dataZoom: [
      {
        type: 'inside',
      },
    ],
    series: [
      {
        name: repository,
        type: 'bar',
        itemStyle: {
          color: theme.palette.primary.light,
          width: 1,
        },
        markPoint: {
          data: [
            { type: 'max', name: '最大值' },
            { type: 'min', name: '最小值' },
          ],
        },
        markLine: {
          data: [{ type: 'average', name: '平均值' }],
        },
        data: data,
      },
    ],
  };

  return <ReactECharts option={options} />;
};
