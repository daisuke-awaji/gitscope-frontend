import React, { useEffect } from "react";
import ReactECharts from "echarts-for-react";
import faker from "faker";
import { BasicCard } from "../../Atoms/BasicCard";
import { Grid, useTheme } from "@material-ui/core";
import { DateRange } from "materialui-daterange-picker";
import { format } from "date-fns";
import { useActivityRatioAPi } from "../../../api/useActivityRatioApi";
import { Loading } from "../../Atoms/Loading";
import * as querystring from "querystring";

type ActivityRatioProps = { repository: string; dateRange: DateRange };

const ActivityRatio: React.FC<ActivityRatioProps> = ({
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
  const path = `/repos/${repository}/activityRatio?${qs}`;
  const { activitySummary, isLoading, setPath } = useActivityRatioAPi({
    path,
  });

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
            value: activitySummary?.totalCommits,
            name: "Commits",
            itemStyle: { color: theme.palette.primary.main },
          },
          {
            value: activitySummary?.totalMergedPullRequests,
            name: "PullRequests",
            itemStyle: { color: theme.palette.secondary.main },
          },
          {
            value: activitySummary?.totalOpenIssues,
            name: "Issues",
            itemStyle: { color: (theme.palette as any).third.main },
          },
          {
            value: activitySummary?.totalComments,
            name: "Comments",
            itemStyle: { color: (theme.palette as any).fourth.main },
          },
        ],
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: "280px" }} />;
};

export const ActivityRatioCard: React.FC<ActivityRatioProps> = (props) => {
  return (
    <BasicCard title="Activity ratio" style={{ height: 437 }}>
      <ActivityRatio {...props} />
      <div style={{ color: "gray", paddingBottom: 5 }}>
        {faker.random.arrayElement([
          "他のプロジェクトと比較するとコメントが多く、活発にコミュニケーションしているようですね。",
          "PullRequestの量に対して、コメントが少ないようです。",
          "1 つのPullRequestに対してコミットの量が極端に多いです。小さな変更を心がけましょう。",
        ])}
      </div>
      <div style={{ color: "gray", fontSize: 12 }}>
        <span style={{ width: 80, display: "inline-block" }}>Commit: </span>
        <span>マージされた PullRequest におけるコミット数</span>
      </div>
      <div style={{ color: "gray", fontSize: 12 }}>
        <span style={{ width: 80, display: "inline-block" }}>
          PullRequests:{" "}
        </span>
        <span>マージされた PullRequest</span>
      </div>
      <div style={{ color: "gray", fontSize: 12 }}>
        <span style={{ width: 80, display: "inline-block" }}>Issue: </span>
        <span>作成された Issue</span>
      </div>
      <div style={{ color: "gray", fontSize: 12 }}>
        <span style={{ width: 80, display: "inline-block" }}>Comment: </span>
        <span>
          マージされた PullRequest, 作成された Issue で行われたコメント
        </span>
      </div>
    </BasicCard>
  );
};
