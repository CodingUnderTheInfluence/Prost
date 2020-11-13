import React from 'react'
import { Grid, Fab } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const FriendsListRenderNoFriends = ({ setViewValue }) => {
  return (
    <Grid>
      <Grid>Loading Friends... please wait</Grid>
      <Grid>
        <Fab color="primary" position="center" onClick={() => setViewValue('AddFriend')}><AddCircleIcon /></Fab>
      </Grid>
    </Grid>
  );
}

export default FriendsListRenderNoFriends
