import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../AuthProvider";
import Backdrop from "./SimpleBackDrop";

export const GitHubAuthCallback = () => {
  const { callback } = useAuth();
  const location = useLocation();
  const code = new URLSearchParams(location.search).get("code");

  useEffect(() => {
    if (code) {
      callback(code);
    }
    // eslint-disable-next-line
  }, []);

  return <Backdrop />;
};
