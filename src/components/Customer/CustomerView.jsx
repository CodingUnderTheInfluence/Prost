import React, { useState } from 'react';
import {
  makeStyles, Paper, Tabs, Tab, Grid, Button, Typography, BottomNavigation, BottomNavigationAction,
} from '@material-ui/core';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ForumIcon from '@material-ui/icons/Forum';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import regeneratorRuntime from 'regenerator-runtime';
<<<<<<< HEAD
import useSocket from 'use-socket.io-client';
=======
>>>>>>> 5e56945... (update) Ability to sign up with google and sign in with google complete
import MapContainer from './Create/Map2.jsx';
import Create from './Create/Create.jsx';
import Messages from './Social/Messages.jsx';
import Logout from '../Logout.jsx';
import CustomerProfile from './Profile/CustomerProfile.jsx';
import FriendsList from './Friends/FriendsList.jsx';

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    borderRadius: '10px',
  },
  stickToBottom: {
    width: '100vw',
    position: 'fixed',
    bottom: '0',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: '10px',
    border: 'solid #0365b0 1px',
  },
});

const CustomerView = ({
  setViewValue, gId, username, setMapLatLng, setUsername, setId,
}) => {
  const classes = useStyles();
  const [value, setValue] = useState();
  if (localStorage.username) { () => setUsername(localStorage.username); }
  if (localStorage.gId) { () => setId(localStorage.gId); }

  if (!gId.length && localStorage.gId) { gId = localStorage.gId; }
  if (!username.length && localStorage.username) { username = localStorage.username; }

  const [socket] = useSocket();
  const userInfo = { username, gId };
  let onlineUsers;

  socket.connect();
  socket.emit('userInfo', userInfo);
  socket.on('onlineUsers', (data) => {
    onlineUsers = data;
    console.log(onlineUsers, 'Everyone Online Right Now!');
  });
  // console.log(socket);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderView = () => {
    if (value === 0) {
      return <FriendsList />;
    }
    if (value === 1) {
<<<<<<< HEAD
      return <MapContainer setMapLatLng={setMapLatLng} gId={gId} />;
=======
      return <MapContainer setMapLatLng={setMapLatLng} />;
>>>>>>> 5e56945... (update) Ability to sign up with google and sign in with google complete
    }
    if (value === 2) {
      return <Messages username={username} />;
    }
    if (value === 3) {
      return <CustomerProfile setViewValue={setViewValue} gId={gId} />;
    }
    return <MapContainer />;
  };
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item container direction="row" justify="center" alignItems="center">
        {renderView()}
      </Grid>
      <Grid item container direction="row" justify="center" alignItems="center">
        <Paper className={classes.stickToBottom}>
          <BottomNavigation
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
            className={classes.stickToBottom}
          >
            <BottomNavigationAction icon={<PeopleAltIcon />} label="Friends" />
            <BottomNavigationAction icon={<AddCircleOutlineIcon />} label="Create" />
            <BottomNavigationAction icon={<ForumIcon />} label="Messages" />
            <BottomNavigationAction icon={<AccountCircleOutlinedIcon />} label="Profile" />
          </BottomNavigation>
        </Paper>
      </Grid>
    </Grid>
  );
};
export default CustomerView;
