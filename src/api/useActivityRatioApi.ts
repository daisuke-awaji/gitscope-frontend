import { useState, useEffect } from 'react';
import { useAuth } from '../AuthProvider';
import { createClient } from './client';

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
  const { user } = useAuth();
  useEffect(() => {
    const fetch = async (token: string) => {
      setIsLoading(true);
      const client = createClient(token);
      const res = await client.get<{
        activitySummary: ActivitySummary;
      }>(path);
      setActivitySummary(res.data.activitySummary);
      setIsLoading(false);
    };
    if (user) {
      fetch(user.token);
    }
    // eslint-disable-next-line
  }, [path]);

  return { activitySummary, isLoading, setPath };
};
