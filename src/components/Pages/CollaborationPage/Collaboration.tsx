import React from "react";
import ReactECharts from "echarts-for-react";
import faker from "faker";
import { BasicCard } from "../../Atoms/BasicCard";
import { useTheme } from "@material-ui/core";

type CommitsTopProps = { repository: string };

const randomNode = [...new Array(10)].map((_, index) => {
  return {
    id: index,
    name: faker.name.firstName(),
    symbol: `image://https://randomuser.me/api/portraits/${faker.helpers.randomize(
      ["women", "men"]
    )}/${faker.random.number(60)}.jpg`,
    symbolSize: faker.random.number({ min: 50, max: 100 }), // num of comment
    value: faker.random.number({ min: 50, max: 100 }), // num of comment
  };
});

const randomLinks = [...new Array(20)].map((_, index) => {
  return {
    source: faker.random.number({ min: 0, max: 9 }),
    target: faker.random.number({ min: 0, max: 9 }),
  };
});

const graph = {
  nodes: randomNode,
  links: randomLinks,
};

const Collaboration: React.FC<
  CommitsTopProps & React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const theme = useTheme();
  const option = {
    title: {
      text: "Communication Network",
      show: false,
      subtext: "Default layout",
      top: "bottom",
      left: "right",
    },
    tooltip: {},
    animationDuration: 3000,
    grid: {
      height: "800px",
    },
    animationEasingUpdate: "quinticInOut",
    series: [
      {
        name: "Les Miserables",
        type: "graph",
        layout: "force",
        force: {
          repulsion: 200,
          gravity: 0.001,
          edgeLength: 200,
        },
        data: graph.nodes,
        links: graph.links,
        roam: true,
        label: {
          position: "right",
          formatter: "{b}",
        },
        lineStyle: {
          color: theme.palette.primary.main,
          curveness: 0.3,
          width: 2,
        },
        emphasis: {
          focus: "adjacency",
          lineStyle: {
            width: 10,
          },
        },
      },
    ],
  };

  return <ReactECharts option={option} {...props} />;
};

export const CollaborationCard: React.FC<CommitsTopProps> = ({
  repository,
}) => {
  return (
    <BasicCard title="Communication Network (mock)">
      <Collaboration repository={repository} style={{ height: "32rem" }} />
    </BasicCard>
  );
};
