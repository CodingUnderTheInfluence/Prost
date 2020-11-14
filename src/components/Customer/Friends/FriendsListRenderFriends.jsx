import React from 'react'
import { Grid, Fab, makeStyles, Button } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PendingFriend from './PendingFriend.jsx';
import IncomingFriend from './IncomingFriend.jsx';
import ConfirmedFriend from './ConfirmedFriend.jsx';

const useStyles = makeStyles({
  pendingRequest: {
    width: '100vw'
  },
  incomingRequest: {
    width: '100vw'
  },
  confirmed: {
    width: '100vw'
  },
  addFriendButton: {
    width: '100%'
  },
  listFriends: {
    height: '90vh'
  },
  addFriendButtonContainer: {
    top: '0',
    position: 'sticky',
    margin: '0,0,10px,0',
    paddingBottom: '10px'
  }
})

const FriendsListRenderFriends = ({
  pendingFriends,
  incomingRequests,
  confirmedFriends,
  userData,
  socket,
  setViewValue,
  setViewObject }) => {

  const classes = useStyles();

  return (
    <Grid container direction="column" className={classes.listFriends}>
      <Grid container direction="column" className={classes.addFriendButtonContainer}>
        <Button className={classes.addFriendButton} variant='contained' color='primary' position='center' onClick={() => setViewValue('AddFriend')}>Add a Friend</Button>
      </Grid>
      <Grid container direction="column" className={classes.pendingRequest}>
        {pendingFriends.map(f => <PendingFriend key={f.id} userData={userData} f={f} />)}
      </Grid>
      <Grid container direction="column" className={classes.incomingRequest}>
        {incomingRequests.map(r => <IncomingFriend key={r.id} userData={userData} r={r} />)}
      </Grid>
      <Grid container direction="column" className={classes.confirmed}>
        {confirmedFriends.map(f => {
          return (
            <ConfirmedFriend
              className={classes.confirmed}
              key={f.id}
              userData={userData}
              f={f} socket={socket}
              setViewValue={setViewValue}
              setViewObject={setViewObject}
            />
          )
        })}
      </Grid>
    </Grid>
  )
}

export default FriendsListRenderFriends
