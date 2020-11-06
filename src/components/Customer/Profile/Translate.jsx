import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  Grid, Typography, Button, List, ListItem, Divider, ListItemText, Popover,
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

export default function Translate({ setView }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <div>
      <ArrowBackIosIcon color="primary" onClick={() => setView('Home')} />
      Hello from Translate
      <List component="nav" aria-label="mailbox folders">
        <ListItem button onClick={handleClick}>
          <ListItemText primary="Inbox" />
        </ListItem>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Typography >The content of the Popover.</Typography>
        </Popover>
        <Divider />
      </List>
    </div>
  );
}
