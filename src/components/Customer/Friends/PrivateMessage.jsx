import React, { useState, useEffect, useRef } from 'react'
import { Button, Grid, TextField, makeStyles, Typography } from '@material-ui/core';
import { flexbox } from '@material-ui/system';
import Axios from 'axios';
import SinglePrivateMessage from './SinglePrivateMessage.jsx';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';


const useStyles = makeStyles({
    messageWindow: {
        height: '90vh',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto'
    },
    bottonTextField: {
        postion: 'sticky',
        paddingTop: '5px'
    },
    renderedMessages: {
        overflow: 'auto',
        flexDirection: 'column',
        position: 'relative',
        height: '600px'
    }
})

const PrivateMessage = ({ f, setViewValue, userData, socket }) => {
    const [messageBody, setMessageBody] = useState('');
    const [allMessages, setAllMessages] = useState([]);
    const classes = useStyles();

    let friendId;
    userData.id === f.id_customer ? friendId = f.id_friend : friendId = f.id_customer;

    const getAllMessages = () => {
        Axios.get(`/db/message/privateMessages?customerOne=${f.id_customer}&customerTwo=${f.id_friend}`)
            .then(({ data }) => {
                setAllMessages(data)
            })
            .catch(err => console.log(err));
    }

    const testMessage = {
        id_sender: userData.id,
        id_recipient: friendId,
        body: messageBody
    }

    const socketMessage = {
        id_sender: userData.id,
        id_recipient: friendId,
        body: messageBody,
        room: f.id
    }

    const sendMessageToServer = () => {
        Axios.post('/db/message/privateMessages', testMessage)
            .catch(err => console.warn(err));
    }
    const handleEnterKeySend = (event) => {
        if (event.charCode === 13) {
            sendMessageToServer();
            emitNewMessage();
            setMessageBody('');
        }
    }

    const sendMessageToServer = () => {
        Axios.post('/db/message/privateMessages', testMessage)
            .then((res) => console.info(res))
            .catch((err) => console.warn(err));
    };
    const handleEnterKeySend = (event) => {
        if (event.charCode === 13) {
            sendMessageToServer();
            emitNewMessage();
            setMessageBody('');
        }
    };

    const joinSocketRoom = () => {
        socket.emit('join', f.id);
    };

    const emitNewMessage = () => {
        socket.emit('privateMessage', socketMessage);
    };

    useEffect(() => {
        getAllMessages();
        joinSocketRoom();
    }, [])

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "auto" })
    }
    useEffect(scrollToBottom, [allMessages])

    // className={classes.messageWindow}className={classes.renderedMessages}className={classes.bottonTextField}
    return (
        <Grid container item direction="column" >
            <Grid container item direction='row'>
                <Button onClick={() => setViewValue('FriendsList')}><ArrowBackIosIcon size="small" /></Button>
            </Grid>
            <Grid container item direction="row">
                <Grid container direction="column" spacing={0} className={classes.renderedMessages} >
                    <div className={classes.renderedMessages}>
                        <Typography variant="subtitle1">This is the beginning if your chat history</Typography>
                        {allMessages.map(m => <SinglePrivateMessage key={m.id} m={m} friendId={friendId} />)}
                        <div ref={messagesEndRef}></div>
                    </div>
                </Grid>
            </Grid>

            <Grid container item direction='row' className={classes.bottonTextField}>
                <TextField
                    value={messageBody}
                    autoComplete="off"
                    id="messageTextArea"
                    label="Your Message"
                    variant="outlined"
                    fullWidth
                    onChange={(event) => setMessageBody(event.target.value)}
                    onKeyPress={(event) => handleEnterKeySend(event)}
                    inputProps={{
                        form: {
                            autocomplete: 'off'
                        }
                    }}
                />
            </Grid>
        </Grid>
    )
}

export default PrivateMessage;
