import React, { useState, useEffect } from 'react';
import SingleMessage from './singleMessage.jsx';

function messageList({ socket }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.once('newMessage', (m) => {
      setMessages([...messages, m]);
    }, [messages]);
  });

  // const handleClass = (index) => {
  //     if(index % 2 === 0 ) {
  //         return classes.evenMessage
  //     } else {
  //         return classes.oddMessage
  //     }
  // };

  return (
    <div>
      <div>Messages</div>
      {messages.map((m, i) => <SingleMessage key={m.name + i} m={m} />)}
    </div>

  );
}

export default messageList;
