import { useState, useEffect } from 'react';
import { useAuth } from '../AuthProvider';
import { createClient } from './client';

type MergedPullRequestPerDay = {
  mergedAt: string; // YYYY-MM-DD
  count: number;
};

type InitialState = {
  path: string;
};
export const usePullRequestsApi = (initialState: InitialState) => {
  const [path, setPath] = useState<string>(initialState.path);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [prs, setPrs] = useState<MergedPullRequestPerDay[]>([]);
  const { user } = useAuth();
  useEffect(() => {
    const fetch = async (token: string) => {
      setIsLoading(true);
      const client = createClient(token);
      const res = await client.get<{
        mergedPullRequestsPerDay: MergedPullRequestPerDay[];
      }>(path);
      setPrs(res.data.mergedPullRequestsPerDay);
      setIsLoading(false);
    };
    if (user) {
      fetch(user.token);
    }
    // eslint-disable-next-line
  }, [path]);

  return { prs, isLoading, setPath };
};
