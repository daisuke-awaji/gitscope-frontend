import { useState, useEffect } from 'react';
import { useAuth } from '../AuthProvider';
import { createClient } from './client';

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
  const { user } = useAuth();
  useEffect(() => {
    const fetch = async (token: string) => {
      setIsLoading(true);
      const client = createClient(token);
      const res = await client.get<{
        prs: PullRequest[];
      }>(path);
      setPrs(res.data.prs);
      setIsLoading(false);
    };
    if (user) {
      fetch(user.token);
    }
    // eslint-disable-next-line
  }, [path]);

  return { prs, isLoading, setPath };
};
