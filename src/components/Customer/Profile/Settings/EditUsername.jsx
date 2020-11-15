import React, { useState, useEffect } from 'react';
import {
  TextField, Grid, Button, makeStyles, Typography,
} from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles({
  button: {
    variant: 'contained',
    color: 'primary',
    padding: '5px',
    margin: '10px 0 10px 0',
  },
  backBtn: {
    opacity: '60%',
  },
});

const EditUsername = ({ customerId, setView }) => {
  const classes = useStyles();
  const [currUserName, setCurrUserName] = useState('');
  const [newUserName, setNewUserName] = useState('');

  const currentUserName = () => {
    axios.get(`/db/customer/username?user=${customerId}`)
      .then(({ data }) => {
        setCurrUserName(data.user_name);
      });
  };

  const updateUserName = () => {
    axios.post(`/db/customer/updateUserName?user=${customerId}&newName=${newUserName}`);
  };

  useEffect(() => {
    currentUserName();
  }, []);

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Typography variant="subtitle1">
          Your current username:
          {' '}
          {currUserName}
        </Typography>
      </Grid>
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <TextField
          id="outlined-basic"
          label="Enter New Username"
          variant="outlined"
          onChange={(e) => { setNewUserName(e.target.value); }}
        />
      </Grid>
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            updateUserName();
            setView('Home');
          }}
          className={classes.button}
        >
          Submit
        </Button>
      </Grid>
      <Button
        size="small"
        color="primary"
        className={classes.backBtn}
        onClick={() => setView('Settings')}
      >
        Back
      </Button>
    </Grid>
  );
};

export default EditUsername;
