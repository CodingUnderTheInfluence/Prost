import React, { useState, useEffect } from 'react';
import {
  makeStyles, Paper, Tabs, Tab, Grid, Button, Typography, BottomNavigation, BottomNavigationAction,
} from '@material-ui/core';
import FriendsList from './FriendsList.jsx';
import FriendForm from './FriendForm.jsx';
import PrivateMessage from './PrivateMessage.jsx';

const useStyles = makeStyles({
    //TODO 
        //STYLE EACH ELEMENT
});

const FriendsView = ({socket, userData}) => {
 
    const [viewValue, setViewValue] = useState('FriendsList');
    const [viewObject, setViewObject] = useState({});

  const renderView = () => {
    if (viewValue === 'Messages') {
      return <PrivateMessage f={viewObject} setViewValue={setViewValue} userData={userData} socket={socket}/>;
    } else if (viewValue === 'FriendsList') {
        return <FriendsList userData={userData} socket={socket} setViewValue={setViewValue} setViewObject={setViewObject} />
    } else if (viewValue === 'AddFriend') {
        return <FriendForm userData={userData} setViewValue={setViewValue} />
    }
  };


  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item container direction="row" justify="center" alignItems="center">
        {renderView(viewValue)}
      </Grid>
    </Grid>
  );
};
export default FriendsView;
