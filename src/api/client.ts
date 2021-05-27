import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { useState } from "react";
import { useAuth } from "../AuthProvider";

export const createClient = (token: string) => {
  const gitscopeApiClient = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_API_ENDPOINT,
    timeout: 29000,
    headers: { Authorization: `Bearer ${token}` },
  });

  return gitscopeApiClient;
};

/**
 * axios を使うカスタムフック. 引数で成功時処理、失敗時処理を記述することも可能
 */
export function useAxios(
  successHookCallback?: (response: AxiosResponse) => void,
  failedHookCallback?: (error: AxiosError) => void
): { isLoading: boolean; axios: AxiosInstance } {
  const { user, tokenHasExpired, reSignWithRefreshToken } = useAuth();

  const axios = createClient(user.token!);
  // ローディングを state 化
  const [isLoading, setIsLoading] = useState(false);
  // リクエストが投げられた時にローディングを true に変更
  axios.interceptors.request.use((request) => {
    setIsLoading(true);
    const expired = tokenHasExpired();
    if (expired) {
      reSignWithRefreshToken();
    }
    return request;
  });
  // レスポンスを受け取った時にローディングを false に変更
  axios.interceptors.response.use(
    (response) => {
      setIsLoading(false);

      typeof successHookCallback === "function" &&
        successHookCallback(response);
      return response;
    },
    (error) => {
      setIsLoading(false);
      typeof failedHookCallback === "function" && failedHookCallback(error);
      throw error;
    }
  );

  // 外部にはローディング状態とaxiosInstanceだけ見せる
  return {
    isLoading,
    axios,
  };
}
