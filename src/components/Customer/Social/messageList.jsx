import React, { useState, useEffect } from 'react';
import SingleMessage from './singleMessage.jsx';

function messageList({socket}) {

    const [messages, setMessages] = useState([{user: 'test', body: 'Test Body'}]);
    
    useEffect(()=> {
        socket.once('newMessage', (m) => {
            console.log(m, 'Incoming Message');
            setMessages([...messages, m]);
            console.log(messages, 'Messages')
        
    }, [messages])
    })



    return (
        <div>
            <div>Messages</div>
            {messages.map((m, i) => <SingleMessage key={m.name + i} m={m} />)}
        </div>
        
    )
}

export default messageList

