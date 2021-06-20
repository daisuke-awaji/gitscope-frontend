import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import * as querystring from "querystring";

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User;
  error?: any;
}
interface IAuthContext extends AuthState {
  loginWithGitHub: () => void;
  checkAuthenticated: () => void;
  tokenHasExpired: () => boolean;
  callback: (code: string) => Promise<void>;
  reSignWithRefreshToken: () => Promise<void>;
  logout: () => void;
}
const initialState: AuthState = {
  isAuthenticated: false,
  user: {
    token: localStorage.getItem("gh-token"),
    name: localStorage.getItem("gh-user-name"),
    imageUrl: localStorage.getItem("gh-user-image-url"),
  },
  isLoading: false,
};
const stub = (): never => {
  throw new Error("You forgot to wrap your component in <AuthProvider>.");
};
export const initialContext = {
  ...initialState,
  tokenHasExpired: stub,
  loginWithGitHub: stub,
  checkAuthenticated: stub,
  callback: stub,
  reSignWithRefreshToken: stub,
  logout: stub,
};

export const AuthContext = React.createContext<IAuthContext>(initialContext);
export const useAuth = () => useContext(AuthContext);

type User = {
  name: string | null;
  token: string | null;
  imageUrl: string | null;
};

export const AuthProvider = (props: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    initialState.isAuthenticated
  );
  const [isLoading, setIsLoading] = useState(initialState.isLoading);
  const [error] = useState(null);
  const [user, setUser] = useState<User>(initialState.user);
  useEffect(() => {
    checkAuthenticated();
    currentAuthenticatedUser();
    // eslint-disable-next-line
  }, []);

  const tokenHasExpired = () => {
    const expires_at = localStorage.getItem("gh-token-expires-at");

    if (expires_at) {
      const expired =
        new Date(Number(expires_at)).getTime() - new Date().getTime() < 0;

      return expired;
    }

    return true;
  };

  const checkAuthenticated = () => {
    setIsLoading(true);
    const token = localStorage.getItem("gh-token");

    const expired = tokenHasExpired();
    if (token && expired) {
      logout();
    }

    // TODO: refresh token refetch flow

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
    setIsLoading(false);
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
        scope: "repo, user, read:org",
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

    const {
      avatarUrl,
      login,
      access_token,
      expires_in,
      refresh_token,
      refresh_token_expires_in,
    } = result.data.user;

    setUser({ name: login, token: access_token, imageUrl: avatarUrl });
    localStorage.setItem("gh-token", access_token);
    const expires_at = new Date(new Date().getTime() + expires_in * 1000);
    localStorage.setItem(
      "gh-token-expires-at",
      expires_at.getTime().toString()
    );
    localStorage.setItem("gh-user-name", login);
    localStorage.setItem("gh-user-image-url", avatarUrl);
    localStorage.setItem("gh-refresh-token", refresh_token);
    const refresh_token_expires_at = new Date(
      new Date().getTime() + refresh_token_expires_in * 1000
    );

    localStorage.setItem(
      "gh-refresh-token-expores-at",
      refresh_token_expires_at.getTime().toString()
    );
    setIsAuthenticated(true);
    setIsLoading(false);
    window.location.replace("/dashboard");
  };

  const reSignWithRefreshToken = async () => {
    const refreshToken = localStorage.getItem("gh-refresh-token");

    const GITHUB_AUTH_CALLBACK_ENDPOINT =
      process.env.REACT_APP_BACKEND_API_ENDPOINT +
      "/auth/github/resignWithRefreshToken";

    const result = await axios.get(
      GITHUB_AUTH_CALLBACK_ENDPOINT + "?refresh_token=" + refreshToken
    );

    const {
      avatarUrl,
      login,
      access_token,
      expires_in,
      refresh_token,
      refresh_token_expires_in,
    } = result.data.user;

    setUser({ name: login, token: access_token, imageUrl: avatarUrl });
    localStorage.setItem("gh-token", access_token);
    const expires_at = new Date(new Date().getTime() + expires_in * 1000);
    localStorage.setItem(
      "gh-token-expires-at",
      expires_at.getTime().toString()
    );
    localStorage.setItem("gh-user-name", login);
    localStorage.setItem("gh-user-image-url", avatarUrl);
    localStorage.setItem("gh-refresh-token", refresh_token);
    const refresh_token_expires_at = new Date(
      new Date().getTime() + refresh_token_expires_in * 1000
    );

    localStorage.setItem(
      "gh-refresh-token-expores-at",
      refresh_token_expires_at.getTime().toString()
    );
    setIsAuthenticated(true);
    setIsLoading(false);
    window.location.replace("/dashboard");
  };

  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setUser({
      token: null,
      name: null,
      imageUrl: null,
    });
    window.location.replace("/");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        tokenHasExpired,
        checkAuthenticated,
        loginWithGitHub,
        callback,
        reSignWithRefreshToken,
        logout,
        user,
        error,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
