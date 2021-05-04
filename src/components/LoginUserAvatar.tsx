import {
  Avatar,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
} from '@material-ui/core';
import React from 'react';
import { useAuth } from '../AuthProvider';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
  iconButtonAvatar: {
    padding: 4,
  },
}));

export const LoginUserAvatar = () => {
  const { user, logout } = useAuth();
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const profileUrl = `https://github.com/${user?.name}`;
  return (
    <div>
      <IconButton
        color="inherit"
        className={classes.iconButtonAvatar}
        onClick={handleClick}
      >
        <Avatar src={user?.imageUrl} alt={user?.name} />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => (window.location.href = profileUrl)}>
          Profile
        </MenuItem>
        <MenuItem onClick={() => logout()}>
          <ExitToAppIcon />
          <span style={{ marginLeft: 20 }}>Logout</span>
        </MenuItem>
      </Menu>
    </div>
  );
};
