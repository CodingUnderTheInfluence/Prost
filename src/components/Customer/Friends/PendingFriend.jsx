import React, {useState, useEffect} from 'react'
import { Button } from '@material-ui/core';
import Axios from 'axios'

function PendingFriend({f}) {

    const [data, setData] = useState();
    const [cancelled, setCancelled] = useState(false);
    
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
        Axios.delete('/db/friendship/removeRequest', {data: f})
            .catch(err => console.warn(err))
    }

    if (data) {
        return (
            <div>
                {data.user_name} has not accepted your request yet.
                {cancelled ? 'Friend Request Cancelled' : <Button onClick={ () => {
                    cancelRequest()
                    setCancelled(true)
                    }}>Cancel Request</Button>}
                
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
