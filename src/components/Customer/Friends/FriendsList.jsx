import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Grid, Fab } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PendingFriend from './PendingFriend.jsx';
import ConfirmedFriend from './ConfirmedFriend.jsx';
import FriendForm from './FriendForm.jsx';
import IncomingFriend from './IncomingFriend.jsx';

function FriendsList() {
    //TODO
    //get request server for all entries in friend table with signed in users google ID
    //if userID in sent column, check if accepted is 1 or 0
        // 1  => render as confirmed friend
        // 0 => render as friend request pending
    //if userID in received column, go through above check again
        // 1 => render as confirmed friend
        // 0 => render as incoming friend request, option to accept or decline
    //Confirmed friends:
        // see online status, name, phone number
        // ability to DM them if online
    const [incomingRequests, setIncomingRequests] = useState([]);
    const [friends, setFriends] = useState([]);
    const [pendingFriends, setPendingFriends] = useState([]);
    const [confirmedFriends, setConfirmedFriends] = useState([])
    const [addFriend, setAddFriend] = useState(false);


    const getMyId = () => {
        return Axios.get(`/db/customer/findMe?username=${localStorage.username}`)
    };

    const getMyFriendData = (id) => {
        Axios.get(`/db/friendship/myFriends?customerId=${id}`)
        .then(({data}) => {
            let tempOutgoingFriends = [];
            let tempConfirmedFriends = [];
            let tempIncomingFriends = [];
            console.log(data, 'All friendship data')
        
            data.forEach(friendship => {
                if (friendship.status === true) {
                    tempConfirmedFriends.push(friendship);
                } else if (friendship.customerId === id && !friendship.status) {
                    tempOutgoingFriends.push(friendship);
                } else if (friendship.id_friend === id && !friendship.status) {
                    tempIncomingFriends.push(friendship)
                }
            })
            setPendingFriends(tempOutgoingFriends);
            setConfirmedFriends(tempConfirmedFriends);
            setIncomingRequests(tempIncomingFriends);
            setFriends(data);
        })
    };

    useEffect(async () => {
        let {data} = await getMyId();
        // console.log(data, 'My Data inside UseEffect returned from function call')
        // // getMyFriendData(mydata.data[0].id)
        // console.log(data[0].id, 'myId')
        getMyFriendData(data[0].id);
        
    }, [])

    if (addFriend) {
        return (
            <FriendForm setAddFriend={setAddFriend} />
        )
    } else {
        if (!friends.length) {
            return(<div>Loading Friends... please wait</div>)
        } else{
            return (
                <Grid >
                <Grid className='pending'>
                    {pendingFriends.map(f => <PendingFriend f={f} />)}
                </Grid>
                <Grid>
                    {incomingRequests.map(r => <IncomingFriend r={r} />)}
                </Grid>
                <Grid className='confirmed'>
                    {confirmedFriends.map(f => <ConfirmedFriend f={f} />)}
                </Grid>
                    <Fab color='primary' position='center' onClick={()=> setAddFriend(true)}><AddCircleIcon /></Fab>
            </Grid>
            )
        }
    }
}

  if (addFriend) {
    return (
      <FriendForm setAddFriend={setAddFriend} />
    );
  }
  if (!friends.length) {
    return (<div>Loading Friends... please wait</div>);
  }
  return (
    <Grid>
      <Grid className="pending">
        {pendingFriends.map((f) => <PendingFriend f={f} />)}
      </Grid>
      <Grid className="confirmed">
        {confirmedFriends.map((f) => <ConfirmedFriend f={f} />)}
      </Grid>
      <Fab color="primary" position="center" onClick={() => setAddFriend(true)}><AddCircleIcon /></Fab>
    </Grid>
  );
}
export default FriendsList;
