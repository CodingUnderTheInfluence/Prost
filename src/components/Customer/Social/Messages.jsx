import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import useSocket from 'use-socket.io-client';
import MessageList from './messageList.jsx';
import MessageForm from './MessageForm.jsx';


function Messages({ username }) {
  const [id, setId] = useState('');
  const [socket] = useSocket();

  socket.connect();
  return (
    <Grid container item direction='column'>
      <MessageList socket={socket} username={username} />
    </Grid>

  );
}

export default Messages;
