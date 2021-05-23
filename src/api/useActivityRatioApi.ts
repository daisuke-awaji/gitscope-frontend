import { useState, useEffect } from "react";
import { useAxios } from "./client";

type ActivitySummary = {
  totalComments: number;
  totalCommits: number;
  totalMergedPullRequests: number;
  totalOpenIssues: number;
};

type InitialState = {
  path: string;
};
export const useActivityRatioAPi = (initialState: InitialState) => {
  const [path, setPath] = useState<string>(initialState.path);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activitySummary, setActivitySummary] = useState<ActivitySummary>();
  const { axios } = useAxios();

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const res = await axios.get<{
        activitySummary: ActivitySummary;
      }>(path);
      setActivitySummary(res.data.activitySummary);
      setIsLoading(false);
    };

    fetch();

    // eslint-disable-next-line
  }, [path]);

  return { activitySummary, isLoading, setPath };
};
