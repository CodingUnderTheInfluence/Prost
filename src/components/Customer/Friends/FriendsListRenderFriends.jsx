import React from 'react'
import { Grid, makeStyles, Button } from '@material-ui/core';
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
  setPendingFriends,
  setIncomingRequests,
  setConfirmedFriends,
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
        {pendingFriends.map((f, i) => <PendingFriend key={f.id} userData={userData} f={f} setPendingFriends={setPendingFriends} pendingFriends={pendingFriends} index={i} />)}
      </Grid>
      <Grid container direction="column" className={classes.incomingRequest}>
        {incomingRequests.map((r, i) => <IncomingFriend key={r.id} userData={userData} r={r} setIncomingRequests={setIncomingRequests} incomingRequests={incomingRequests} setConfirmedFriends={setConfirmedFriends} confirmedFriends={confirmedFriends} index={i} />)}
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
