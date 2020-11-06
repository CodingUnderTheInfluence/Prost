import React, {useState} from 'react'
import {ListItem, Button} from '@material-ui/core';
import Axios from 'axios';

function FoundUser({u}) {
    const [friendStatus, setFriendStatus] = useState(false)
    const handleFriendRequest = (u) => {
        let sender, recipient, status;
        Axios.get(`/db/customer/findMe?username=${localStorage.username}`)
        .then(({data}) => {
            sender = data[0].id;
            recipient = u.id;
            status = false;
            const friendRequest = {sender, recipient, status}
            console.log(friendRequest, 'Friend Request Obj')
            Axios.post('/db/friendship/newFriend', friendRequest)
            .then(res => console.log(res))
        })
    };

    return (
        <ListItem>
            <span>{u.first_name + u.last_name}</span>{friendStatus ? <span>Friend Request Sent</span> :(<span><Button onClick={() => {
                setFriendStatus(true)
                handleFriendRequest(u)
                }}>Send Friend Request</Button></span>)}
        </ListItem>
    )
}

export default FoundUser
