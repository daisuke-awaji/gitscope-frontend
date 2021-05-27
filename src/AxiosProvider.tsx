import axios, { AxiosInstance } from "axios";
import React, { useContext } from "react";
import { useAuth } from "./AuthProvider";

export type AxiosState = {
  isLoading: boolean;
  axios: AxiosInstance;
};

export const AxiosContext = React.createContext<AxiosState>({
  isLoading: false,
  axios: axios,
});

export const useAxios = () => useContext(AxiosContext);

const createClient = (token: string) => {
  const gitscopeApiClient = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_API_ENDPOINT,
    timeout: 29000,
    headers: { Authorization: `Bearer ${token}` },
  });

  return gitscopeApiClient;
};

export const AxiosProvider = (props: any) => {
  const { user, tokenHasExpired, reSignWithRefreshToken } = useAuth();

  const [isLoading, setIsLoading] = React.useState(false);

  const client = createClient(user.token!);
  // ローディングを state 化
  // リクエストが投げられた時にローディングを true に変更
  client.interceptors.request.use((request) => {
    setIsLoading(true);
    const expired = tokenHasExpired();
    if (expired) {
      reSignWithRefreshToken();
    }
    return request;
  });

  // レスポンスを受け取った時にローディングを false に変更
  client.interceptors.response.use(
    (response) => {
      setIsLoading(false);
      return response;
    },
    (error) => {
      setIsLoading(false);
      throw error;
    }
  );

  return (
    <AxiosContext.Provider
      value={{
        isLoading,
        axios: client,
      }}
    >
      {props.children}
    </AxiosContext.Provider>
  );
};
