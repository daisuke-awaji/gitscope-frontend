import React from "react";
import ReactECharts from "echarts-for-react";
import faker from "faker";
import theme from "../../theme";
import { BasicCard } from "../BasicCard";

type CommitsTopProps = { repository: string };

const CommitsTop: React.FC<CommitsTopProps> = ({ repository }) => {
  const options = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // Use axis to trigger tooltip
        type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
      },
    },
    legend: {
      data: ["Commits", "PullRequests", "Issues", "Comments"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
    },
    yAxis: {
      type: "category",
      data: ["John", "Sum", "hummy", "jaggy", "Bob", "Smap", "AABB", "Green"],
    },
    toolbox: {
      show: true,
      feature: {
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    series: [
      {
        name: "Commits",
        type: "bar",
        itemStyle: {
          color: theme.palette.primary.light,
          width: 1,
        },
        stack: "total",
        label: {
          show: true,
        },
        emphasis: {
          focus: "series",
        },
        data: [
          faker.random.number(10),
          faker.random.number(10),
          faker.random.number(10),
          faker.random.number(10),
          faker.random.number(10),
          faker.random.number(10),
          faker.random.number(10),
          faker.random.number(10),
        ],
      },
      {
        name: "PullRequests",
        type: "bar",
        itemStyle: {
          color: theme.palette.primary.main,
          width: 1,
        },
        stack: "total",
        label: {
          show: true,
        },
        emphasis: {
          focus: "series",
        },
        data: [
          faker.random.number(10),
          faker.random.number(10),
          faker.random.number(10),
          faker.random.number(10),
          faker.random.number(10),
          faker.random.number(10),
          faker.random.number(10),
          faker.random.number(10),
        ],
      },
      {
        name: "Issues",
        type: "bar",
        itemStyle: {
          color: theme.palette.primary.dark,
          width: 1,
        },
        stack: "total",
        label: {
          show: true,
        },
        emphasis: {
          focus: "series",
        },
        data: [
          faker.random.number(10),
          faker.random.number(10),
          faker.random.number(10),
          faker.random.number(10),
          faker.random.number(10),
          faker.random.number(10),
          faker.random.number(10),
          faker.random.number(10),
        ],
      },
      {
        name: "Comments",
        type: "bar",
        itemStyle: {
          color: theme.palette.secondary.light,
          width: 1,
        },
        stack: "total",
        label: {
          show: true,
        },
        emphasis: {
          focus: "series",
        },
        data: [
          faker.random.number(10),
          faker.random.number(10),
          faker.random.number(10),
          faker.random.number(10),
          faker.random.number(10),
          faker.random.number(10),
          faker.random.number(10),
          faker.random.number(10),
        ],
      },
    ],
  };

  return <ReactECharts option={options} />;
};

export const DeveloperScoreCard: React.FC<CommitsTopProps> = ({
  repository,
}) => {
  return (
    <BasicCard title="Developer score">
      <div style={{ color: "gray" }}>
        {faker.random.arrayElement([
          "XXXX さんは積極的にコミュニケーションをとっているようですね。",
          "XXXX さんのコミット数が多いですね。この調子でがんばりましょう。",
        ])}
      </div>
      <CommitsTop repository={repository} />
    </BasicCard>
  );
};
