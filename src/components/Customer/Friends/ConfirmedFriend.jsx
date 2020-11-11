import React, {useState, useEffect} from 'react'
import {Grid, Button} from '@material-ui/core';
import CallIcon from '@material-ui/icons/Call';
import ChatIcon from '@material-ui/icons/Chat';
import Axios from 'axios';
import PrivateMessage from './PrivateMessage.jsx';

function ConfirmedFriend({f, userData, socket, setViewObject, setViewValue}) {
    
    const [friendData, setFriendData] = useState();
    const [viewMessages, setViewMessages] = useState(false);

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

    if (viewMessages) {
        return <PrivateMessage f={f} setViewMessages={setViewMessages} userData={userData} socket={socket}/>
    } else {
        if (friendData) {
            console.log(friendData, 'Friend Data');
            return (
                <Grid>
                    <Grid>
                        {friendData.first_name + friendData.last_name}
                    </Grid>
                    <Grid>
                        <Button variant="contained" color="primary" href={`tel:+1${friendData.phone_number}`} >
                            <CallIcon/>
                        </Button>
                        <Button variant="contained" color="primary" onClick={() => {
                            setViewObject(f)
                            setViewValue('Messages')
                            }}>
                            <ChatIcon />
                        </Button> 
    
                    </Grid>
    
                </Grid>
            )
        } else {
            return (
                <Grid>Loading data for friend.</Grid>
            )
        }

    }
}

export default ConfirmedFriend
