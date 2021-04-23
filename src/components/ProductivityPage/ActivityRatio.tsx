import React from "react";
import ReactECharts from "echarts-for-react";
import faker from "faker";
import { BasicCard } from "../BasicCard";

type ActivityRatioProps = { repository: string };

const ActivityRatio: React.FC<ActivityRatioProps> = ({ repository }) => {
  const option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "top",
      left: "center",
    },
    series: [
      {
        name: "Activity Ratio",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "40",
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          {
            value: faker.random.number(400),
            name: "Commits",
          },
          { value: faker.random.number(400), name: "PullRequests" },
          { value: faker.random.number(400), name: "Issues" },
          { value: faker.random.number(400), name: "Comments" },
        ],
      },
    ],
  };

  return <ReactECharts option={option} />;
};

export const ActivityRatioCard: React.FC<ActivityRatioProps> = ({
  repository,
}) => {
  return (
    <BasicCard title="Activity ratio" style={{ height: 437 }}>
      <div style={{ marginTop: 20 }}></div>
      <ActivityRatio repository={repository} />
      <div style={{ color: "gray" }}>
        {faker.random.arrayElement([
          "他のプロジェクトと比較するとコメントが多く、活発にコミュニケーションしているようですね。",
          "PullRequestの量に対して、コメントが少ないようです。",
          "１つのPullRequestに対してコミットの量が極端に多いです。小さな変更を心がけましょう。",
        ])}
      </div>
    </BasicCard>
  );
};
