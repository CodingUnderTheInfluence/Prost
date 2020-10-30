import React from 'react'
import MessageList from './messageList.jsx';
import {Button} from '@material-ui/core'


//render a search bar at the top
//should render a list of message
//render a create new message button


function Messages() {
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