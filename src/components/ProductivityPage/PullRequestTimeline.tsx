import React from "react";
import ReactECharts from "echarts-for-react";
import theme from "../../theme";
import faker from "faker";
import { BasicCard } from "../BasicCard";

type PullRequestTimelineProps = { repository: string };

export const PullRequestTimelineCard: React.FC<PullRequestTimelineProps> = ({
  repository,
}) => {
  return (
    <BasicCard title="Pull Request timeline">
      <div style={{ color: "gray" }}>
        {faker.random.arrayElement(["マージされた Pull Request の数の推移"])}
      </div>
      <PullRequestTimeline repository={repository} />
    </BasicCard>
  );
};

const PullRequestTimeline: React.FC<PullRequestTimelineProps> = ({
  repository,
}) => {
  const options = {
    xAxis: {
      type: "category",
      boundaryGap: true,
    },
    yAxis: {
      type: "value",
    },
    tooltip: {
      trigger: "axis",
    },
    toolbox: {
      show: true,
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ["line", "bar"] },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    legend: {
      top: 0,
      data: [repository],
    },
    dataZoom: [
      {
        type: "inside",
      },
    ],
    series: [
      {
        name: repository,
        type: "bar",
        itemStyle: {
          color: theme.palette.primary.light,
          width: 1,
        },
        markPoint: {
          data: [
            { type: "max", name: "最大值" },
            { type: "min", name: "最小值" },
          ],
        },
        markLine: {
          data: [{ type: "average", name: "平均值" }],
        },
        data: [
          ["2019-10-1", faker.random.number(10)],
          ["2019-10-2", faker.random.number(10)],
          ["2019-10-3", faker.random.number(10)],
          ["2019-10-4", faker.random.number(10)],
          ["2019-10-5", faker.random.number(10)],
          ["2019-10-6", faker.random.number(10)],
          ["2019-10-7", faker.random.number(10)],
          ["2019-10-8", faker.random.number(10)],
          ["2019-10-9", faker.random.number(10)],
          ["2019-10-10", faker.random.number(10)],
          ["2019-10-11", faker.random.number(10)],
          ["2019-10-12", faker.random.number(10)],
          ["2019-10-13", faker.random.number(10)],
          ["2019-10-14", faker.random.number(10)],
          ["2019-10-15", faker.random.number(10)],
          ["2019-10-16", faker.random.number(10)],
          ["2019-10-17", faker.random.number(10)],
          ["2019-10-18", faker.random.number(10)],
          ["2019-10-19", faker.random.number(10)],
          ["2019-10-20", faker.random.number(10)],
          ["2019-10-21", faker.random.number(10)],
          ["2019-10-22", faker.random.number(10)],
          ["2019-10-23", faker.random.number(10)],
          ["2019-10-24", faker.random.number(10)],
          ["2019-10-25", faker.random.number(10)],
        ],
      },
    ],
  };

  return <ReactECharts option={options} />;
};
