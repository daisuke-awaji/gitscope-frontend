import { useState, useEffect } from "react";
import { useAxios } from "./client";
import * as querystring from "querystring";

export type RepositoryStatus = {
  nameWithOwner: string;
  url: string;
  followed: boolean;
};

export const useRepositoryStatusApi = (followed?: boolean) => {
  const [path, setPath] = useState<string>(
    "/repos?" + querystring.stringify({ followed })
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [repositories, setRepositories] = useState<RepositoryStatus[]>([]);
  const { axios } = useAxios();
  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const res = await axios.get(path);

      setRepositories(res.data.repos);
      setIsLoading(false);
    };
    fetch();
    // eslint-disable-next-line
  }, [path]);

  return { repositories, setRepositories, isLoading, setPath };
};
