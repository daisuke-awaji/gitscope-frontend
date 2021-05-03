import { Grid } from '@material-ui/core';
import React from 'react';
import InboxIcon from '@material-ui/icons/Inbox';

export const NoData: React.FC<{ style?: React.CSSProperties }> = (props) => {
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={props.style}
    >
      <InboxIcon color="disabled" fontSize="large" />
      <div style={{ color: 'gray' }}>no data</div>
    </Grid>
  );
};
