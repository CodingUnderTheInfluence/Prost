import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Grid, Fab } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PendingFriend from './PendingFriend.jsx';
import ConfirmedFriend from './ConfirmedFriend.jsx';
import FriendForm from './FriendForm.jsx';
import IncomingFriend from './IncomingFriend.jsx';

function FriendsList({userData}) {
    //TODO
    //Confirmed friends:
        // see online status, name, phone number
        // ability to DM them if online
    const [incomingRequests, setIncomingRequests] = useState([]);
    const [friends, setFriends] = useState([]);
    const [pendingFriends, setPendingFriends] = useState([]);
    const [confirmedFriends, setConfirmedFriends] = useState([])
    const [addFriend, setAddFriend] = useState(false);

    const getMyFriendData = (id) => {
        const results = {};
        Axios.get(`/db/friendship/myFriends?customerId=${id}`)
        .then(({data}) => {
            let tempOutgoingFriends = [];
            let tempConfirmedFriends = [];
            let tempIncomingFriends = [];
            console.log(data, 'All friendship data')
            
            data.forEach(friendship => {
                console.log(id, 'my ID')
                console.log(friendship, 'Current Friendship being processed')
                console.log(friendship.status, 'current processee status')
                if (friendship.status === true) {
                    tempConfirmedFriends.push(friendship);
                } else if (friendship.id_customer === id && friendship.status === false) {
                    tempOutgoingFriends.push(friendship);
                } else if (friendship.id_friend === id && friendship.status === false) {
                    tempIncomingFriends.push(friendship)
                }
            })
            console.log(tempOutgoingFriends ,'Temp Outgoing');
            console.log(tempConfirmedFriends, 'Temp Confirmed');
            console.log(tempIncomingFriends, 'Temp Incoming')
            // results.incoming = tempIncomingFriends;
            // results.outgoing = tempOutgoingFriends;
            // results.confirmed = tempConfirmedFriends;
            // results.all = data;
            setFriends(data)
            setIncomingRequests(tempIncomingFriends);
            setPendingFriends(tempOutgoingFriends);
            setConfirmedFriends(tempConfirmedFriends);
        })
        .catch(err => console.warn(err))
        return results;
    };

    useEffect(async () => {
        console.info(userData, 'userData from props')
        getMyFriendData(userData.id)
    }, [])

    if (addFriend) {
        return (
            <FriendForm userData={userData} setAddFriend={setAddFriend} />
        )
    } else {
        if (!friends) {
            return (
                <Grid>
                    <Grid>Loading Friends... please wait</Grid>
                    <Grid>
                        <Fab color="primary" position="center" onClick={() => setAddFriend(true)}><AddCircleIcon /></Fab>
                    </Grid>
                </Grid>
            );
        } else{
            return (
                <Grid >
                <Grid className='pending'>
                    {pendingFriends.map(f => <PendingFriend userData={userData} f={f} />)}
                </Grid>
                <Grid>
                    {incomingRequests.map(r => <IncomingFriend userData={userData} r={r} />)}
                </Grid>
                <Grid className='confirmed'>
                    {confirmedFriends.map(f => <ConfirmedFriend userData={userData} f={f} />)}
                </Grid>
                    <Fab color='primary' position='center' onClick={()=> setAddFriend(true)}><AddCircleIcon /></Fab>
            </Grid>
            )
        }
    }
}

//   if (addFriend) {
//     return (
//       <FriendForm setAddFriend={setAddFriend} />
//     );
//   }
//   if (!friends.length) {
//     return (
//         <Grid>
//             <Grid>Loading Friends... please wait</Grid>
//             <Grid>
//                 <Fab color="primary" position="center" onClick={() => setAddFriend(true)}><AddCircleIcon /></Fab>
//             </Grid>
//         </Grid>
//         );
//   } else {
//         return (
//     <Grid>
//       <Grid className="pending">
//         {pendingFriends.map((f) => <PendingFriend f={f} />)}
//       </Grid>
//       <Grid className="confirmed">
//         {confirmedFriends.map((f) => <ConfirmedFriend f={f} />)}
//       </Grid>
//       <Fab color="primary" position="center" onClick={() => setAddFriend(true)}><AddCircleIcon /></Fab>
//     </Grid>
//   );
//   }

export default FriendsList;
