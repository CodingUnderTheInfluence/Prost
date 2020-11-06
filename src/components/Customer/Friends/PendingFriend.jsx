import React, {useState, useEffect} from 'react'
import { Button } from '@material-ui/core';
import Axios from 'axios'

function PendingFriend({f}) {
    //useEffect to gather userInfo from database

    const [data, setData] = useState();
    
    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        Axios.get(`/db/customer/getFriendById?customerId=${f.id_friend}`)
        .then(({data}) => {
            console.log(data, 'Pending Friend Data')
            setData(data)
        })
    };
    
    const cancelRequest = () => {
        alert('Friend Request Cancelled')
    }

    if (data) {
        return (
            <div>
                {data.user_name} has not decided to be your friend yet.
                <Button onClick={acceptRequest}>Cancel Request</Button>
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

export default PendingFriend;
