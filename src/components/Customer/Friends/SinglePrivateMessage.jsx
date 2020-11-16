import { Grid, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles({
    sent: {
        border: '2px solid #dedede',
        backgroundColor: '#5fc9f8',
        borderRadius: '5px',
        padding: '10px',
        margin: '10px, 0',
        marginRight: '0px',
        marginLeft: 'auto',
        maxWidth: '200px',
        wordWrap: 'normal',
    },
    received: {
        border: '2px solid #dedede',
        backgroundColor: '#8e8e93',
        borderRadius: '5px',
        padding: '10px',
        margin: '10px, 0',
        maxWidth: '200px',
        wordWrap: 'normal',
        marginRight: 'auto',
        marginLeft: '0px',
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
        <div>
            <Grid container item direction='row' className={messageClass}>{m.body}</Grid>
        </div>
    )

}

export default SinglePrivateMessage
