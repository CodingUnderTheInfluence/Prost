import React, { useState, useEffect } from 'react'
import { Button } from '@material-ui/core';
import Axios from 'axios';


const IncomingFriend = ({r}) => {
    const [person, setPerson] = useState();
    
    const getData = () => {
        console.log(r, 'R')
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
        alert(`Friend request ${r.id} accepted. You are now friends with ${person.first_name}`)
    }

    const rejectRequest = () => {
        alert(`Friend request ${r.id} rejected. You are NOT friends with ${person.first_name}`)
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
