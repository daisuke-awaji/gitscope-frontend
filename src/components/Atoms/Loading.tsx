import { CircularProgress } from "@material-ui/core";
import React, { Fragment } from "react";

export const Loading: React.FC = () => {
  return (
    <Fragment>
      <CircularProgress />
    </Fragment>
  );
};
