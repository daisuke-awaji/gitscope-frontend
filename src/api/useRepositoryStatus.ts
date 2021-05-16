import { useState, useEffect } from 'react';
import { useAuth } from '../AuthProvider';
import { createClient } from './client';
import * as querystring from 'querystring';

export type RepositoryStatus = {
  nameWithOwner: string;
  url: string;
  followed: boolean;
};

export const useRepositoryStatusApi = (followed?: boolean) => {
  const [path, setPath] = useState<string>(
    '/repos?' + querystring.stringify({ followed }),
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [repositories, setRepositories] = useState<RepositoryStatus[]>([]);
  const { user } = useAuth();
  useEffect(() => {
    const fetch = async (token: string) => {
      setIsLoading(true);
      const client = createClient(token);
      const res = await client.get(path);

      setRepositories(res.data.repos);
      setIsLoading(false);
    };
    if (user) {
      fetch(user.token);
    }
    // eslint-disable-next-line
  }, [path]);

  return { repositories, isLoading, setPath };
};
