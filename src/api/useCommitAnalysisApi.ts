import { useState, useEffect } from "react";
import { useAxios } from "./client";

export type CommitState = "error" | "failure" | "pending" | "success";

type LeadTime = {
  open: number;
  work: number;
  review: number;
};

type FileComplexity = {
  file: string;
  complexity: number;
};

export type CommitAnalysis = {
  repositoryNameWithOwner: string;
  sha: string;
  state: CommitState;
  createdAt?: Date;
  fileComplexities?: Array<FileComplexity>;
  riskPoint?: number;
  leadTime?: LeadTime;
};

type InitialState = {
  path: string;
};
export const useCommitAnalysisApi = (initialState: InitialState) => {
  const [path, setPath] = useState<string>(initialState.path);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [commits, setCommits] = useState<CommitAnalysis[]>([]);
  const { axios } = useAxios();
  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const res = await axios.get<{
        commits: CommitAnalysis[];
      }>(path);
      setCommits(res.data.commits);
      setIsLoading(false);
    };
    fetch();

    // eslint-disable-next-line
  }, [path]);

  return { commits, isLoading, setPath };
};
