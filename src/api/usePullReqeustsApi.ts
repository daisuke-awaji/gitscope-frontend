import { useState, useEffect } from "react";
import { useAxios } from "./client";

type PullRequest = {
  number: number;
  firstCommitToPRCreated: number; // seconds
  prCreatedAtToLastCommit: number;
  lastCommitToMerge: number;
  title: string;
  author: string;
  url: string;
  createdAt: string;
  mergedAt: string;
  additions: number;
  deletions: number;
  authoredDate: string;
  lastCommitDate: string;
};

type InitialState = {
  path: string;
};
export const usePullRequestsApi = (initialState: InitialState) => {
  const [path, setPath] = useState<string>(initialState.path);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [prs, setPrs] = useState<PullRequest[]>([]);
  const { axios } = useAxios();
  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const res = await axios.get<{
        prs: PullRequest[];
      }>(path);
      setPrs(res.data.prs);
      setIsLoading(false);
    };
    fetch();

    // eslint-disable-next-line
  }, [path]);

  return { prs, isLoading, setPath };
};
