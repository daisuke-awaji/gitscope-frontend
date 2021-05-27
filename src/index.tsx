import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./AuthProvider";
import { AxiosProvider } from "./AxiosProvider";
import reportWebVitals from "./reportWebVitals";
import { RepositoryProvider } from "./RepositoryProvider";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <AxiosProvider>
        <RepositoryProvider>
          <App />
        </RepositoryProvider>
      </AxiosProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
