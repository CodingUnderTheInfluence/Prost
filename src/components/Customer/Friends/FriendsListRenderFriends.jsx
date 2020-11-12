import React from 'react'
import { Grid, Fab } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PendingFriend from './PendingFriend.jsx';
import IncomingFriend from './IncomingFriend.jsx';
import ConfirmedFriend from './ConfirmedFriend.jsx';

const FriendsListRenderFriends = ({
  pendingFriends,
  incomingRequests,
  confirmedFriends,
  userData,
  socket,
  setViewValue,
  setViewObject }) => {
  return (
    <Grid >
      <Grid className='pending'>
        {pendingFriends.map(f => <PendingFriend key={f.id} userData={userData} f={f} />)}
      </Grid>
      <Grid>
        {incomingRequests.map(r => <IncomingFriend key={r.id} userData={userData} r={r} />)}
      </Grid>
      <Grid className='confirmed'>
        {confirmedFriends.map(f => <ConfirmedFriend key={f.id} userData={userData} f={f} socket={socket} setViewValue={setViewValue} setViewObject={setViewObject} />)}
      </Grid>
      <Fab color='primary' position='center' onClick={() => setViewValue('AddFriend')}><AddCircleIcon /></Fab>
    </Grid>
  )
}

export default FriendsListRenderFriends
