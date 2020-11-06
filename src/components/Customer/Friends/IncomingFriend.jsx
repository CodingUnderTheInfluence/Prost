import React, { useState, useEffect } from 'react'
import { Button } from '@material-ui/core';
import Axios from 'axios';


const IncomingFriend = ({r}) => {
    const [data, setData] = useState();
    
    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        Axios.get(`/db/customer/getFriendById?customerId=${r.customerId}`)
        .then(({data}) => {
            setData(data)
        })
        .catch(err => console.warn(err))
    };
    
    const acceptRequest = () => {
        alert(`Friend request ${r.id} accepted. You are now friends with ${data.user_name}`)
    }

    const rejectRequest = () => {
        alert(`Friend request ${r.id} rejected. You are NOT friends with ${data.user_name}`)
    };

    if (data) {
        return (
            <div>
                {data.user_name} has not decided to be your friend yet.
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
