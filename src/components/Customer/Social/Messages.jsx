import React, { useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import useSocket from 'use-socket.io-client';
import MessageList from './messageList.jsx';
import MessageForm from './MessageForm.jsx';

// render a search bar at the top
// should render a list of message
// render a create new message button

function Messages({ username }) {
  const [id, setId] = useState('');
  const [socket] = useSocket();

  socket.connect();
  console.info(socket);

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
  );
}

export default Messages;
