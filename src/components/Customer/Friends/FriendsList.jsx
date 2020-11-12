import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import FriendsListRenderFriends from './FriendsListRenderFriends.jsx';
import FriendsListRenderNoFriends from './FriendsListRenderNoFriends.jsx';


function FriendsList({ userData, socket, setViewValue, setViewObject }) {
    //TODO
    //Confirmed friends:
    // see online status, name, phone number - Mostly Done
    // ability to DM them - Done
    //Fab element
    // remove inline styling
    //Rendering
    //cleanup render if else statements

    const [incomingRequests, setIncomingRequests] = useState([]);
    const [friends, setFriends] = useState([]);
    const [pendingFriends, setPendingFriends] = useState([]);
    const [confirmedFriends, setConfirmedFriends] = useState([])
    const [addFriend, setAddFriend] = useState(false);

    const getMyFriendData = (id) => {
        const results = {};
        Axios.get(`/db/friendship/myFriends?customerId=${id}`)
            .then(({ data }) => {
                let tempOutgoingFriends = [];
                let tempConfirmedFriends = [];
                let tempIncomingFriends = [];

                data.forEach(friendship => {
                    if (friendship.status === true) {
                        tempConfirmedFriends.push(friendship);
                    } else if (friendship.id_customer === id && friendship.status === false) {
                        tempOutgoingFriends.push(friendship);
                    } else if (friendship.id_friend === id && friendship.status === false) {
                        tempIncomingFriends.push(friendship)
                    }
                })

                setFriends(data)
                setIncomingRequests(tempIncomingFriends);
                setPendingFriends(tempOutgoingFriends);
                setConfirmedFriends(tempConfirmedFriends);
            })
            .catch(err => console.warn(err))
        return results;
    };

    useEffect(async () => {
        getMyFriendData(userData.id)
    }, [])

    return (
        friends ? <FriendsListRenderFriends
            pendingFriends={pendingFriends}
            incomingRequests={incomingRequests}
            confirmedFriends={confirmedFriends}
            userData={userData} socket={socket}
            setViewValue={setViewValue}
            setViewObject={setViewObject}
        />
            :
            <FriendsListRenderNoFriends
                setViewValue={setViewValue}
            />
    )
    // if (addFriend) {
    //     return (
    //         <FriendForm userData={userData} setAddFriend={setAddFriend} setViewValue={setViewValue}/>
    //     )
    // } else {
    //     if (!friends) {
    //         return (
    //             <Grid>
    //                 <Grid>Loading Friends... please wait</Grid>
    //                 <Grid>
    //                     <Fab color="primary" position="center" onClick={() => setAddFriend(true)}><AddCircleIcon /></Fab>
    //                 </Grid>
    //             </Grid>
    //         );
    //     } else {
    //         return (
    //             <Grid >
    //                 <Grid className='pending'>
    //                     {pendingFriends.map(f => <PendingFriend key={f.id} userData={userData} f={f} />)}
    //                 </Grid>
    //                 <Grid>
    //                     {incomingRequests.map(r => <IncomingFriend key={r.id} userData={userData} r={r} />)}
    //                 </Grid>
    //                 <Grid className='confirmed'>
    //                     {confirmedFriends.map(f => <ConfirmedFriend key={f.id} userData={userData} f={f} socket={socket} setViewValue={setViewValue} setViewObject={setViewObject}/>)}
    //                 </Grid>
    //                 <Fab color='primary' position='center' onClick={() => setViewValue('AddFriend')}><AddCircleIcon /></Fab>
    //             </Grid>
    //         )
    //     }
    // }
}

export default FriendsList;
