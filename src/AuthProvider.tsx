import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import * as querystring from "querystring";

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user?: User;
  error?: any;
}
interface IAuthContext extends AuthState {
  loginWithGitHub: () => void;
  callback: (code: string) => Promise<void>;
}
const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
};
const stub = (): never => {
  throw new Error("You forgot to wrap your component in <AuthProvider>.");
};
export const initialContext = {
  ...initialState,
  loginWithGitHub: stub,
  callback: stub,
};

export const AuthContext = React.createContext<IAuthContext>(initialContext);
export const useAuth = () => useContext(AuthContext);

type User = {
  name: string;
  token: string;
  imageUrl: string;
};

export const AuthProvider = (props: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error] = useState(null);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    checkAuthenticated();
    currentAuthenticatedUser();
  }, []);

  const checkAuthenticated = () => {
    setIsLoading(true);
    const token = localStorage.getItem("gh-token");
    const name = localStorage.getItem("gh-user-name");
    const imageUrl = localStorage.getItem("gh-user-image-url");

    if (token && name && imageUrl) {
      setIsAuthenticated(true);
      setUser({
        token,
        name,
        imageUrl,
      });
    }
  };

  const currentAuthenticatedUser = async (): Promise<void> => {
    // const user: CognitoUser = await Auth.currentAuthenticatedUser();
    // setUser(user);
  };

  const loginWithGitHub = () => {
    const GITHUB_AUTHORIZE_ENDPOINT =
      "https://github.com/login/oauth/authorize" +
      "?" +
      querystring.stringify({
        client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
        scope: "repo, user",
      });
    setIsLoading(true);
    window.location.replace(GITHUB_AUTHORIZE_ENDPOINT);
  };

  const callback = async (code: string) => {
    const GITHUB_AUTH_CALLBACK_ENDPOINT =
      process.env.REACT_APP_BACKEND_API_ENDPOINT + "/auth/github/callback";
    const result = await axios.get(
      GITHUB_AUTH_CALLBACK_ENDPOINT + "?code=" + code
    );

    const { token, avatarUrl, login } = result.data.user;
    setUser({ name: login, token, imageUrl: avatarUrl });
    localStorage.setItem("gh-token", token);
    localStorage.setItem("gh-user-name", login);
    localStorage.setItem("gh-user-image-url", avatarUrl);
    setIsAuthenticated(true);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        loginWithGitHub,
        callback,
        user,
        error,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
