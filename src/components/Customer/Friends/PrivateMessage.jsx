import React, {useState, useEffect} from 'react'
import {Button, Grid, TextField} from '@material-ui/core';
import { flexbox } from '@material-ui/system';
import Axios from 'axios';
import SinglePrivateMessage from './SinglePrivateMessage.jsx';

const PrivateMessage = ({ f, setViewMessages, userData, socket }) => {
    //onComponent load:
        //join socket room
        //retrieve all old messages from the database
        //order the messages by sent or received status from oldest to newest
    const getMessages = () => {
        //contacts the db with current userId and selected friend ID and grabs all messages between the two
    }

    const [messageBody, setMessageBody] = useState('');
    const [allMessages, setAllMessages] = useState([]);

    let friendId;
    userData.id === f.id_customer ? friendId = f.id_friend : friendId = f.id_customer;

    const getAllMessages = () => {
        Axios.get(`/db/message/privateMessages?customerOne=${f.id_customer}&customerTwo=${f.id_friend}`)
            .then(({data}) => {
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
            .then(res => console.log(res))
            .catch(err => console.warn(err));
    }
    const handleEnterKeySend = (event) => {
        if (event.charCode === 13) {
            sendMessageToServer();
            emitNewMessage();
            setMessageBody('');
        }
    }

    const joinSocketRoom = () => {
        socket.emit('join', f.id)
    }

    const emitNewMessage = () => {
        socket.emit('privateMessage', socketMessage)
    };

    socket.once('incomingPrivateMessage', message => {
        setAllMessages([...allMessages, message])
    })

    useEffect(()=>{
        getAllMessages();
        joinSocketRoom();
    },[])


    return (
        <Grid>
            <Grid>
                <Button onClick={() => setViewMessages(false)}>Back to Friends</Button>
            </Grid>
            <Grid>
                This is the beginning if your chat history
                {allMessages.map(m => <SinglePrivateMessage key={m.id} m={m} friendId={friendId} />)}
            </Grid>
            <Grid>
                <TextField
                        value={messageBody}
                        id="messageTextArea"
                        label="Your Message"
                        variant="filled"
                        onChange={(event) => setMessageBody(event.target.value)}
                        onKeyPress={(event) => handleEnterKeySend(event)}
                    />
            </Grid>
        </Grid>
    )
}

export default PrivateMessage
