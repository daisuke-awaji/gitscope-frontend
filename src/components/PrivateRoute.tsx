import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../AuthProvider";

const redirectToLogin = (location: any): React.ReactNode => {
  // 未認証の場合は '/' にリダイレクトさせる。

  return <Redirect to={{ pathname: "/", state: { from: location } }} />;
};

export const PrivateRoute = ({ children, ...rest }: any): JSX.Element => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? children : redirectToLogin(location)
      }
    />
  );
};
