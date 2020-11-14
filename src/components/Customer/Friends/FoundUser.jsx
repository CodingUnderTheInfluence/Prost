import React, { useState } from 'react'
import { ListItem, Button, makeStyles, Grid } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Axios from 'axios';

const useStyles = makeStyles({
    singleFoundUser: {
        fontSize: '20px',
        borderTop: 'black solid 1px',
        borderBottom: 'black solid 1px'
    }
})

function FoundUser({ userData, u }) {
    const [friendStatus, setFriendStatus] = useState(false)
    const classes = useStyles();

    const handleFriendRequest = (currentId, uId) => {
        let sender, recipient, status;
        sender = currentId;
        recipient = uId;
        status = false;
        const friendRequest = { sender, recipient, status }
        Axios.post('/db/friendship/newFriend', friendRequest)
            .catch(err => console.warn(err));
    };

    return (
        <ListItem>
            <Grid container item justify="center" direction='row' className={classes.singleFoundUser}>
                {`${u.first_name} ${u.last_name}`}{friendStatus ? 'Friend Request Sent' : (<Button variant='primary' onClick={() => {
                    setFriendStatus(true)
                    handleFriendRequest(userData.id, u.id)
                }}><PersonAddIcon /></Button>)}
            </Grid>
        </ListItem>
    )
}

export default FoundUser