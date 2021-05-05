import React, { useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import theme from '../../theme';
import faker from 'faker';
import { BasicCard } from '../BasicCard';
import { usePullRequestsApi } from '../../api/usePullReqeustsApi';
import { DateRange } from 'materialui-daterange-picker';
import { format } from 'date-fns';
import * as querystring from 'querystring';
import { Grid } from '@material-ui/core';
import { Loading } from '../Atoms/Loading';

/**
 * 任意の桁で切り上げする関数
 * @param {number} value 四捨五入する数値
 * @param {number} base どの桁で四捨五入するか（10→10の位、0.1→小数第１位）
 * @return {number} 四捨五入した値
 */
function orgCeil(value: number, base: number) {
  return Math.ceil(value * base) / base;
}

type ProductionLeadTimeProps = { repository: string; dateRange: DateRange };
const ProductionLeadTime: React.FC<ProductionLeadTimeProps> = ({
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
  const path = `/repos/${repository}/prs?${qs}`;
  const { prs, isLoading, setPath } = usePullRequestsApi({ path });

  useEffect(() => {
    setPath(path);
  }, [setPath, path]);

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

  const firstCommitToPRCreated = [];
  const prCreatedToLastCommit = [];
  const lastCommitToMerged = [];

  for (const pr of prs) {
    const fctopr = orgCeil(pr.firstCommitToPRCreated / (60 * 60 * 24), 100);
    firstCommitToPRCreated.push([pr.number, fctopr > 0 ? fctopr : 0]);
    const prtolast = orgCeil(pr.prCreatedAtToLastCommit / (60 * 60 * 24), 100);
    prCreatedToLastCommit.push([pr.number, prtolast > 0 ? prtolast : 0]);
    const lastToMerged = orgCeil(pr.lastCommitToMerge / (60 * 60 * 24), 100);
    lastCommitToMerged.push([pr.number, lastToMerged > 0 ? lastToMerged : 0]);
  }

  const options = {
    title: {
      text: 'Production Lead Time',
      show: false,
    },
    xAxis: {
      name: 'PR',
      type: 'category',
      boundaryGap: true,
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} Day',
      },
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
      data: ['Open', 'Work', 'Review'],
    },
    dataZoom: [
      {
        type: 'inside',
      },
    ],
    series: [
      {
        name: 'Open',
        stack: 'LeadTime',
        smooth: true,
        type: 'line',
        areaStyle: {},
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
        emphasis: {
          focus: 'series',
        },
        data: firstCommitToPRCreated,
      },
      {
        name: 'Work',
        stack: 'LeadTime',
        smooth: true,
        type: 'line',
        areaStyle: {},
        itemStyle: {
          color: theme.palette.primary.main,
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
        emphasis: {
          focus: 'series',
        },
        data: prCreatedToLastCommit,
      },
      {
        name: 'Review',
        stack: 'LeadTime',
        smooth: true,
        type: 'line',
        areaStyle: {},
        itemStyle: {
          color: theme.palette.primary.dark,
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
        emphasis: {
          focus: 'series',
        },
        data: lastCommitToMerged,
      },
    ],
  };

  return <ReactECharts theme={'vintage'} option={options} />;
};

export const ProductionLeadTimeCard: React.FC<ProductionLeadTimeProps> = (
  props,
) => {
  return (
    <BasicCard title="Production Lead Time">
      <div style={{ color: 'gray' }}>
        {faker.random.arrayElement([
          '先週と比べてリードタイムが落ちています。プロセスを見直しましょう。',
          'リードタイムが改善されています。この調子で開発を進めましょう。',
          '最終コミットからマージまでの時間が長い場合、レビューやその他の作業に時間を要している可能性があります。',
        ])}
      </div>
      <div style={{ color: 'gray', fontSize: 12, paddingBottom: 10 }}>
        ※ Production lead time は 初回のコミットから PullRequest
        がマージされるまでの時間を計測しています。PullRequest
        はマージされた時系列順に表示されます。
      </div>
      <div style={{ color: 'gray', fontSize: 12 }}>
        <span style={{ width: 50, display: 'inline-block' }}>Open: </span>
        <span>First Commit - PR Created</span>
      </div>
      <div style={{ color: 'gray', fontSize: 12 }}>
        <span style={{ width: 50, display: 'inline-block' }}>Work: </span>
        <span>PR Created - Last Commit</span>
      </div>
      <div style={{ color: 'gray', fontSize: 12 }}>
        <span style={{ width: 50, display: 'inline-block' }}>Review: </span>
        <span>Last Commit - PR Merged</span>
      </div>

      <ProductionLeadTime {...props} />
    </BasicCard>
  );
};
