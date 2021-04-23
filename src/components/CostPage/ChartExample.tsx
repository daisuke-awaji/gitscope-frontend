import React from "react";
import ReactECharts from "echarts-for-react";
import theme from "../../theme";
import faker from "faker";

const Page: React.FC = () => {
  const options = {
    title: {
      text: "APIキーごとの実行回数",
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
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
      top: 30,
      data: ["123abc"],
    },
    series: [
      {
        name: "123abc",
        type: "line",
        itemStyle: {
          color: theme.palette.primary.light,
          width: 1,
        },
        data: [
          ["2019-10-10", 100],
          ["2019-10-11", 560],
          ["2019-10-12", 750],
          ["2019-10-13", 580],
          ["2019-10-14", 250],
          ["2019-10-15", 300],
          ["2019-10-16", 450],
          ["2019-10-17", 300],
          ["2019-10-18", 100],
        ],
      },
    ],
  };

  for (let i = 0; i < 3; i++) {
    const apikey = faker.random.uuid();
    const a: any = {
      name: apikey,
      type: "line",
      itemStyle: {
        // color: theme.palette.primary.light,
        width: 1,
      },
      data: [
        ["2019-10-10", faker.random.number(1000)],
        ["2019-10-11", faker.random.number(1000)],
        ["2019-10-12", faker.random.number(1000)],
        ["2019-10-13", faker.random.number(1000)],
        ["2019-10-14", faker.random.number(1000)],
        ["2019-10-15", faker.random.number(1000)],
        ["2019-10-16", faker.random.number(1000)],
        ["2019-10-19", faker.random.number(1000)],
        ["2019-10-20", faker.random.number(1000)],
      ],
    };
    options.series.push(a);
    options.legend.data.push(apikey);
  }

  return <ReactECharts option={options} />;
};
export default Page;
