
import React, { useState } from 'react'
import { Grid, TextField, Button, makeStyles, Icon } from '@material-ui/core';


function MessageForm({ socket }) {
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');

    const handleSubmit = (e) => {
        socket.emit('sendMessage', {
            name: username,
            body: message
        });
    };


    return (
        <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
            spacing={1}
        >
            <TextField id="messageUsername" label="Name" variant="filled" onChange={(event) => { setUsername(event.target.value) }} />

            <TextField
                value={message}
                id="messageTextArea"
                label="Your Message"
                multiline
                rows={4}
                variant="filled"
                onChange={(event) => setMessage(event.target.value)}
            />

            <Button
                variant="contained"
                onClick={() => {
                    handleSubmit()
                    setMessage('');
                }}
                color="primary"
            >
                Send
                </Button>
            {/* <button onClick={handleSubmit}>Send</button> */}
        </Grid>
    )
}

export default MessageForm
