import React, { useState, useEffect } from 'react'
import { Grid, Button, makeStyles, ButtonGroup, TextareaAutosize } from '@material-ui/core';
import CallIcon from '@material-ui/icons/Call';
import ChatIcon from '@material-ui/icons/Chat';
import Axios from 'axios';
import PrivateMessage from './PrivateMessage.jsx';

const useStyles = makeStyles({
  userName: {
    textAlign: 'center',
    fontSize: '20px',
    margin: "0 10px 0 0"
  },
  callBtn: {
  },
  msgBtn: {
  },
  buttonsGroup: {
  },
  mainContent: {
    borderTop: 'black solid 1px',
    borderBottom: 'black solid 1px'
  }
})

function ConfirmedFriend({ f, userData, socket, setViewObject, setViewValue }) {

  const [friendData, setFriendData] = useState();
  const [viewMessages, setViewMessages] = useState(false);

  //uses ID from f to grab customer information
  const getData = () => {
    let friendId;
    userData.id === f.id_customer ? friendId = f.id_friend : friendId = f.id_customer;
    Axios.get(`/db/customer/getFriendById?customerId=${friendId}`)
      .then(({ data }) => {
        setFriendData(data)
      })
      .catch(err => console.warn(err))
  };

  useEffect(() => {
    getData();
  }, []);

  const classes = useStyles();
  if (viewMessages) {
    return <PrivateMessage f={f} setViewMessages={setViewMessages} userData={userData} socket={socket} />
  } else {
    if (friendData) {
      return (
        <Grid container justify='space-between' direction='row' className={classes.mainContent}>
          <Grid item container direction='column' className={classes.userName} xs={5}>
            {`${friendData.first_name} ${friendData.last_name}`}
          </Grid>
          <Grid item container direction='column' className={classes.buttonsGroup} xs={3}>
            <ButtonGroup variant="text">
              <Button className={classes.callBtn} color="primary" href={`tel:+1${friendData.phone_number}`} >
                <CallIcon />
              </Button>
              <Button className={classes.msgBtn} color="primary" onClick={() => {
                setViewObject(f)
                setViewValue('Messages')
              }}>
                <ChatIcon />
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid >
      )
    } else {
      return (
        <Grid>Loading data for friend.</Grid>
      )
    }

  }
}

export default ConfirmedFriend;
