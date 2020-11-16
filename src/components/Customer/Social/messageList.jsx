import React, { useState, useEffect, useRef } from 'react';
import { Grid, Typography, makeStyles, TextField } from '@material-ui/core'
import SingleMessage from './singleMessage.jsx';
import Axios from 'axios';


const useStyles = makeStyles({
  messageWindow: {
    height: '90vh',
    width: '100%',
    overflow: 'auto'
  },
  bottonTextField: {
    postion: 'sticky',
    paddingTop: '5px',
    bottom: '0'
  },
  renderedMessages: {
    overflow: 'auto',
    flexDirection: 'column',
    position: 'relative',
    height: '600px'
  }
})

function messageList({ socket, username }) {
  const [messages, setMessages] = useState([]);
  const [myMessage, setMyMessage] = useState('');
  const classes = useStyles();

  useEffect(() => {
    socket.once('newMessage', (m) => {
      setMessages([...messages, m]);
    }, [messages]);
  });

  useEffect(() => {
    Axios.get('/db/message/public')
      .then(({ data }) => setMessages(data))
  }, [])


  const handleEnterKeySend = (event) => {
    if (event.charCode === 13 && myMessage.length) {
      sendMessageToServer();
      emitNewMessage();
      setMyMessage('');
    }
  };

  const emitNewMessage = () => {
    socket.emit('sendMessage', {
      username,
      body: myMessage
    });
  }

  const sendMessageToServer = () => {
    const message = {
      username,
      body: myMessage
    }

    Axios.post('/db/message/public', message)
  }
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "auto" })
  }

  useEffect(scrollToBottom, [messages])

  return (
    <Grid container item direction="row" className={classes.messageWindow}>
      <Grid container direction="column" spacing={0} className={classes.renderedMessages} >
        <div className={classes.renderedMessages}>
          <Typography variant="subtitle1">This is the beginning if the public chat</Typography>
          {messages.map(m => <SingleMessage key={m.id} m={m} />)}
          <div ref={messagesEndRef}></div>
        </div>
      </Grid>

      <Grid container item direction='row' className={classes.bottonTextField}>
        <TextField
          value={myMessage}
          autoComplete="off"
          id="messageTextArea"
          label="Your Message"
          variant="outlined"
          fullWidth
          onChange={(event) => setMyMessage(event.target.value)}
          onKeyPress={(event) => handleEnterKeySend(event)}
          inputProps={{
            form: {
              autocomplete: 'off'
            }
          }}
        />
      </Grid>
    </Grid>
  )
}

export default messageList;
