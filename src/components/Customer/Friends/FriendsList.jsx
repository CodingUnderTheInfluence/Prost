import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import FriendsListRenderFriends from './FriendsListRenderFriends.jsx';
import FriendsListRenderNoFriends from './FriendsListRenderNoFriends.jsx';


function FriendsList({ userData, socket, setViewValue, setViewObject }) {
    const [incomingRequests, setIncomingRequests] = useState([]);
    const [friends, setFriends] = useState([]);
    const [pendingFriends, setPendingFriends] = useState([]);
    const [confirmedFriends, setConfirmedFriends] = useState([])

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
            setPendingFriends={setPendingFriends}
            setIncomingRequests={setIncomingRequests}
            setConfirmedFriends={setConfirmedFriends}
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
}

export default FriendsList;
