import React, { useContext, useEffect, useState } from "react";
import { RepositoryStatus } from "./api/useRepositoryStatus";
import { useAxios } from "./AxiosProvider";

export type RepositoryState = {
  isLoading: boolean;
  repositories: RepositoryStatus[];
  setRepositories?: React.Dispatch<React.SetStateAction<RepositoryStatus[]>>;
  fetch?: (path: string) => Promise<void>;
  error?: any;
};

export const RepositoryContext = React.createContext<RepositoryState>({
  isLoading: false,
  repositories: [],
});

export const useRepositories = () => useContext(RepositoryContext);

export const RepositoryProvider = (props: any) => {
  const { axios } = useAxios();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [repositories, setRepositories] = useState<RepositoryStatus[]>([]);

  const fetch = async (path: string) => {
    setIsLoading(true);
    const res = await axios.get(path);
    setRepositories(res.data.repos);
    setIsLoading(false);
  };

  useEffect(() => {
    fetch("/repos");
    // eslint-disable-next-line
  }, []);

  return (
    <RepositoryContext.Provider
      value={{
        isLoading,
        repositories,
        setRepositories,
        fetch,
      }}
    >
      {props.children}
    </RepositoryContext.Provider>
  );
};
