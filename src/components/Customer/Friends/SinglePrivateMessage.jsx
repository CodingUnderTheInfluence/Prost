import { Grid, makeStyles, Box } from '@material-ui/core'
import { flexbox } from '@material-ui/system';
import React from 'react'

const useStyles = makeStyles({
    sent: {
        border: '2px solid #dedede',
        backgroundColor: '#5fc9f8',
        borderRadius: '5px',
        padding: '10px',
        margin: '10px, 0',
        justifyContent: 'flex-end',
    },
    received: {
        border: '2px solid #dedede',
        backgroundColor: '#8e8e93',
        borderRadius: '5px',
        padding: '10px',
        margin: '10px, 0',
        justifyContent: 'flex-start'
    },
});

const SinglePrivateMessage = ({ m, friendId }) => {
    const classes = useStyles();
    let messageClass;
    if (m.id_sender === friendId) {
        messageClass = classes.received;
    } else {
        messageClass = classes.sent;
    }

    return (
        <Box className={messageClass}>{m.body}</Box>
    )

}

export default SinglePrivateMessage
