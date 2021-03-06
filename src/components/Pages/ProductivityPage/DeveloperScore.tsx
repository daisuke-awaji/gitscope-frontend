import React from "react";
import ReactECharts from "echarts-for-react";
import faker from "faker";
import { BasicCard } from "../../Atoms/BasicCard";
import { useTheme } from "@material-ui/core";

type CommitsTopProps = { repository: string };

const CommitsTop: React.FC<CommitsTopProps> = ({ repository }) => {
  const theme = useTheme();
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
      {
        name: "Issues",
        type: "bar",
        itemStyle: {
          color: (theme.palette as any).third.light,
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
          color: (theme.palette as any).fourth.light,
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
    <BasicCard title="Developer score (mock)">
      <div style={{ color: "gray" }}>
        {faker.random.arrayElement([
          "XXXX ????????????????????????????????????????????????????????????????????????????????????",
          "XXXX ???????????????????????????????????????????????????????????????????????????????????????",
        ])}
      </div>
      <CommitsTop repository={repository} />
    </BasicCard>
  );
};
