import { Avatar, IconButton, makeStyles } from "@material-ui/core";
import React from "react";
import { useAuth } from "../AuthProvider";

const useStyles = makeStyles((theme) => ({
  iconButtonAvatar: {
    padding: 4,
  },
}));

export const LoginUserAvatar = () => {
  const { user } = useAuth();
  const classes = useStyles();

  return (
    <IconButton color="inherit" className={classes.iconButtonAvatar}>
      <Avatar src={user?.imageUrl} alt={user?.name} />
    </IconButton>
  );
};
