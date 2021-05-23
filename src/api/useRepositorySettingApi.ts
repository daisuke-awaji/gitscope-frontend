import { useState } from "react";
import { useAuth } from "../AuthProvider";
import { useAxios } from "./client";

type RepositorySetting = {
  nameWithOwner: string;
  followed: boolean;
  config?: string;
};

type PostResponse = {
  userRepositorySetting: {
    login: string;
    repositoryNameWithOwner: string;
    enabled: boolean;
  };
};
export const useRepositorySettingApi = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAuth();
  const { axios } = useAxios();

  const save = async (
    repositorySetting: RepositorySetting
  ): Promise<PostResponse | null> => {
    setIsLoading(true);
    let result = null;
    if (user) {
      const path = `/repos/${repositorySetting.nameWithOwner}/setup`;

      const res = await axios.post<PostResponse>(
        path,
        {
          enabled: repositorySetting.followed,
          config: repositorySetting.config,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      result = res.data;
    }
    setIsLoading(false);
    return result;
  };

  return { save, isLoading };
};
