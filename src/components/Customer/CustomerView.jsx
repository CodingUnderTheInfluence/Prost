import React, { useState, useEffect } from 'react';
import {
  makeStyles, Grid, Button, Typography, BottomNavigation, BottomNavigationAction,
} from '@material-ui/core';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ForumIcon from '@material-ui/icons/Forum';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import regeneratorRuntime from 'regenerator-runtime';
import useSocket from 'use-socket.io-client';
import Axios from 'axios';
import MapContainer from './Create/Map2.jsx';
import Messages from './Social/Messages.jsx';
import CustomerProfile from './Profile/CustomerProfile.jsx';
import FriendsView from './Friends/FriendsView.jsx';

const useStyles = makeStyles({
  root: {
    maxWidth: "auto",
  },
  stickToBottom: {
    position: 'sticky',
    bottom: '0',
    margin: "auto",
    border: 'solid #0365b0 1px',
    height: '10vh',
    width: '100%'
  },
  main: {
    height: '90vh',
    width: '100%'
  },
});

const CustomerView = ({
  setViewValue, gId, username, setMapLatLng, setUsername, setId,
}) => {
  const classes = useStyles();
  const [value, setValue] = useState();
  const [userData, setUserData] = useState();

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
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const findMe = (id) => Axios.get(`/db/customer/findMe?gId=${id}`)
    .then(({ data }) => {
      setUserData(data);
    })
    .catch((err) => console.warn(err));

  useEffect(() => {
    findMe(gId);
  }, []);

  const renderView = () => {
    if (value === 0) {
      return <FriendsView userData={userData} socket={socket} />;
    }
    if (value === 1) {
      return <MapContainer setMapLatLng={setMapLatLng} gId={gId} />;
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
      <Grid item container direction="row" className={classes.main}>
        {renderView()}
      </Grid>
      <Grid item container direction="row" className={classes.stickToBottom}>
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
      </Grid>
    </Grid>
  );
};
export default CustomerView;
