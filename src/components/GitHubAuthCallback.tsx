import axios from "axios";
import React, { useEffect } from "react";
import { useLocation } from "react-router";

export const GitHubAuthCallback = () => {
  const location = useLocation();
  const code = new URLSearchParams(location.search).get("code");
  useEffect(() => {
    axios.get("http://localhost:8080/auth/github/callback?code=" + code);
  }, [code]);
  return <>github login callback</>;
};
