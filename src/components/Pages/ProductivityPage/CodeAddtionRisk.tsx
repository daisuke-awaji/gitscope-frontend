import React, { useEffect } from "react";
import ReactECharts from "echarts-for-react";
import faker from "faker";
import { BasicCard } from "../../Atoms/BasicCard";
import { usePullRequestsApi } from "../../../api/usePullReqeustsApi";
import { DateRange } from "materialui-daterange-picker";
import { format } from "date-fns";
import * as querystring from "querystring";
import { Grid, useTheme } from "@material-ui/core";
import { Loading } from "../../Atoms/Loading";

type CodeAdditionRiskProps = { repository: string; dateRange: DateRange };
const CodeAdditionRisk: React.FC<CodeAdditionRiskProps> = ({
  repository,
  dateRange,
}) => {
  const theme = useTheme();
  const startDateString = dateRange.startDate
    ? format(dateRange.startDate, "yyyy-MM-dd")
    : undefined;
  const endDateString = dateRange.endDate
    ? format(dateRange.endDate, "yyyy-MM-dd")
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

  const data: any[] = [];
  prs.forEach((pr, index) => {
    const d = index < 10 ? faker.random.number(100) : faker.random.number(30);
    data.push([pr.number, d]);
  });

  const options = {
    title: {
      text: "Code Addition Risk",
      show: false,
    },
    xAxis: {
      name: "PR",
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
    // legend: {
    //   top: 0,
    //   data: ['Open', 'Work', 'Review'],
    // },
    dataZoom: [
      {
        type: "inside",
      },
    ],
    // // Make gradient line here
    visualMap: [
      {
        show: false,
        type: "continuous",
        seriesIndex: 0,
        min: 0,
        max: 100,
        itemStyle: { color: theme.palette.error.main },
      },
    ],
    series: [
      {
        name: "Open",
        smooth: true,
        type: "line",
        // areaStyle: {},
        itemStyle: {
          color: theme.palette.error.main,
          width: 1,
        },
        markPoint: {
          data: [
            {
              type: "max",
              name: "最大值",
              itemStyle: { color: theme.palette.error.main },
            },
          ],
        },
        data,
      },
    ],
  };

  return <ReactECharts theme={"vintage"} option={options} />;
};

export const CodeAdditionRiskCard: React.FC<CodeAdditionRiskProps> = (
  props
) => {
  return (
    <BasicCard title="Code Addition Risk (mock)">
      <div style={{ color: "gray" }}>
        {faker.random.arrayElement([
          "Risk Points が xx 以上になると要注意です。",
        ])}
      </div>
      <div style={{ color: "gray", fontSize: 12, paddingBottom: 10 }}>
        ※ Code Addition Risk は Pull Request
        におけるコード変更量とディスカッション率、変更されるソースコードの凝集度などの要素から算出されます。
      </div>

      <CodeAdditionRisk {...props} />
    </BasicCard>
  );
};
