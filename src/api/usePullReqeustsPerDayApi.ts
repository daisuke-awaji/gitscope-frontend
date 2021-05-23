import { useState, useEffect } from "react";
import { useAxios } from "./client";

type MergedPullRequestPerDay = {
  mergedAt: string; // YYYY-MM-DD
  count: number;
};

type InitialState = {
  path: string;
};
export const usePullRequestsPerDayApi = (initialState: InitialState) => {
  const [path, setPath] = useState<string>(initialState.path);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [prs, setPrs] = useState<MergedPullRequestPerDay[]>([]);
  const { axios } = useAxios();
  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const res = await axios.get<{
        mergedPullRequestsPerDay: MergedPullRequestPerDay[];
      }>(path);
      setPrs(res.data.mergedPullRequestsPerDay);
      setIsLoading(false);
    };
    fetch();

    // eslint-disable-next-line
  }, [path]);

  return { prs, isLoading, setPath };
};
