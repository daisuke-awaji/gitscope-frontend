import React from 'react';
import ReactECharts from 'echarts-for-react';
import theme from '../../theme';
import faker from 'faker';
import { BasicCard } from '../BasicCard';

type ProductionLeadTimeProps = { repository: string };
const ProductionLeadTime: React.FC<ProductionLeadTimeProps> = ({
  repository,
}) => {
  const firstCommitToPRCreated = [];
  for (let i = 32; i < 55; i++) {
    firstCommitToPRCreated.push([i, faker.random.float({ min: 0, max: 2 })]);
  }
  const prCreatedToLastCommit = [];
  for (let i = 32; i < 55; i++) {
    prCreatedToLastCommit.push([i, faker.random.float({ min: 0, max: 10 })]);
  }
  const lastCommitToMerged = [];
  for (let i = 32; i < 55; i++) {
    lastCommitToMerged.push([i, faker.random.float({ min: 1, max: 7 })]);
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

export const ProductionLeadTimeCard: React.FC<ProductionLeadTimeProps> = ({
  repository,
}) => {
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
        がマージされるまでの時間を計測しています。
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

      <ProductionLeadTime repository={repository} />
    </BasicCard>
  );
};
