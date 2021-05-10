import { useState } from "react";
import { useAuth } from "../AuthProvider";
import { createClient } from "./client";

type RepositorySetting = {
  nameWithOwner: string;
  followed: boolean;
};

export const useRepositorySettingApi = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAuth();

  const save = async (repositorySetting: RepositorySetting) => {
    setIsLoading(true);
    if (user) {
      const client = createClient(user.token);
      const path = `/repos/${repositorySetting.nameWithOwner}/setup`;

      await client.post(
        path,
        {
          enabled: repositorySetting.followed,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
    setIsLoading(false);
  };

  return { save, isLoading };
};
