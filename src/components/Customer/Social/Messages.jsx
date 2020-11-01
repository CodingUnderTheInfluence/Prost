import React, {useState} from 'react'
import MessageList from './messageList.jsx';
import {Button} from '@material-ui/core'
import useSocket from 'use-socket.io-client';
import MessageForm from './MessageForm.jsx';



//render a search bar at the top
//should render a list of message
//render a create new message button


function Messages({username}) {
    const [id, setId] = useState('');
    const [socket] = useSocket();

    socket.connect();
    console.log(socket);

    return (
        <div>
            <div>
                <MessageList socket={socket} />
            </div>
            <div>
                <MessageForm socket={socket} username={username} />
            </div>
        </div>
    )
}

export default Messages