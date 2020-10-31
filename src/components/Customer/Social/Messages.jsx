import React from 'react'
import MessageList from './messageList.jsx';
import {Button} from '@material-ui/core'
import io from 'socket.io-client';


//render a search bar at the top
//should render a list of message
//render a create new message button


function Messages() {
    useEffect(() => {
        const socket = io("localhost:3000", {
            reconnectionDelayMax: 10000,
            query: {
                auth: "123"
            }
        });
    })
    return (
        <div>
            <div>
                Search
            </div>
            <div>
                <MessageList />
            </div>
            <div className="createMessageButton">
                <Button>New Conversation</Button>
            </div>
        </div>
    )
}

export default Messages