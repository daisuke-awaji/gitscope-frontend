import axios from "axios";

export const createClient = (token: string) => {
  const gitscopeApiClient = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_API_ENDPOINT,
    timeout: 5000,
    headers: { Authorization: `Bearer ${token}` },
  });

  return gitscopeApiClient;
};
