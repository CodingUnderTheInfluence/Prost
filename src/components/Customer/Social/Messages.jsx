import React, {useState} from 'react'
import MessageList from './messageList.jsx';
import {Button, Grid} from '@material-ui/core'
import MessageForm from './MessageForm.jsx';



//render a search bar at the top
//should render a list of message
//render a create new message button


function Messages({username, socket}) {
    

    return (
        <div>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="stretch"
                spacing={1}
            >
                <MessageList socket={socket} />
            </Grid>
                
            <div>
                <MessageForm socket={socket} username={username} />
            </div>
        </div>
    )
}

export default Messages