import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import { Grid, Fab } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PendingFriend from './PendingFriend.jsx';
import ConfirmedFriend from './ConfirmedFriend.jsx';
import FriendForm from './FriendForm.jsx';

function FriendsList() {
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
    const [allFriendships, setAllFriendships] = useState([])

    useEffect(() => {
        Axios.get(`/db/customer/findMe?username=${localStorage.username}`)
        .then(({data}) => {
            Axios.get(`/db/friendship/myFriends?customerId=${data[0].id}`)
            .then(({data}) => {
                let tempPendingFriends = [];
                let tempConfirmedFriends = [];
                let tempIncomingFriends = [];
                console.log(data)
            
                data.forEach(friendship => {
                    if (friendship.status === 0) {
                        tempPendingFriends.push(friendship)
                    } else if (friendship.status === 1) {
                        tempConfirmedFriends.push(friendship)
                    } else {
                        tempIncomingFriends.push(friendship);
                    }
                })
                setPendingFriends(tempPendingFriends);
                setConfirmedFriends(tempConfirmedFriends);
                setIncomingRequests(tempIncomingFriends);
                setFriends(data);
            })
        })
        // Axios.get('/db/friendship/')
        //     .then(({data}) => {
        //         console.log(data, 'FRIENDSHIPS DATA')
        //         setFriends(data);
        //         setPendingFriends(data);
        //         setConfirmedFriends(data);
        //     })
        //     .catch(err => console.log(err, 'ERROR IN FRIENDSHIP GET REQUESTS'))
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
                <Grid className='confirmed'>
                    {confirmedFriends.map(f => <ConfirmedFriend f={f} />)}
                </Grid>
                    <Fab color='primary' position='center' onClick={()=> setAddFriend(true)}><AddCircleIcon /></Fab>
            </Grid>
            )
        }
    }
}

export default FriendsList