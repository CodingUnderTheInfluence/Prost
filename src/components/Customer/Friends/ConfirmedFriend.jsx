import React, {useState, useEffect} from 'react'
import {Grid} from '@material-ui/core';
import Axios from 'axios';

function ConfirmedFriend({f, userData}) {
    
    const [friendData, setFriendData] = useState();

    //uses ID from f to grab customer information
    const getData = () => {
        let friendId;
        userData.id === f.id_customer ? friendId = f.id_friend : friendId = f.id_customer;
        Axios.get(`/db/customer/getFriendById?customerId=${friendId}`)
        .then(({data}) => {
            setFriendData(data)
        })
        .catch(err => console.warn(err))
    };

    useEffect(() => {
        getData();
    }, [])

    if (friendData) {
        return (
            <Grid>
                {friendData.first_name + friendData.last_name} Message, View Info
            </Grid>
        )
    } else {
        return (
            <Grid>Loading data for friendf.</Grid>
        )
    }
}

export default ConfirmedFriend
