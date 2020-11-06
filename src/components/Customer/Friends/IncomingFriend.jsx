import React, { useState, useEffect } from 'react'
import { Button } from '@material-ui/core';
import Axios from 'axios';


const IncomingFriend = ({r}) => {
    const [person, setPerson] = useState();
    
    const getData = () => {
        Axios.get(`/db/customer/getFriendById?customerId=${r.id_customer}`)
        .then(({data}) => {
            setPerson(data)
        })
        .catch(err => console.warn(err))
    };

    useEffect(() => {
        getData();
    }, [])

    const acceptRequest = () => {
        Axios.put('/db/friendship/acceptRequest', {data: r})
        .catch(err => console.warn(err))
    }

    const rejectRequest = () => {
        Axios.delete('/db/friendship/removeRequest', {data: r})
        .catch(err => console.warn(err))

    };

    if (person) {
        return (
            <div>
                {person.first_name} wants to be your friend.
                <Button onClick={acceptRequest}>Accept</Button><Button onClick={rejectRequest}>Decline</Button>
            </div>
        )
    } else {
        return (
            <div>
                Loading Friend Data
            </div>
        )
    }
}

export default IncomingFriend
