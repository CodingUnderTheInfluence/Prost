import React, { useState, useEffect } from 'react';
import {
  Grid, Button, TextField, makeStyles,
} from '@material-ui/core';
import axios from 'axios';
import { LocalConvenienceStoreOutlined } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  button: {
    margin: '10px 0 10px 0',
  },
  backBtn: {
    opacity: '60%',
    margin: '0 0 0 0',
  },
}));

const OwnerCredentials = ({ setBarId, setLandingView }) => {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const credentialsSubmit = () => {
    const params = {
      email,
      password,
    };
    axios.post('/db/owner/login', { params })
      .then(({ data }) => {
        if (data === 'Email or Password Incorrect') {

        } else {
          localStorage.setItem('ownerToken', data); // stores token in localstorage
          axios(
            {
              method: 'POST',
              url: '/db/owner/is-verify',
              headers: {
                token: localStorage.ownerToken,
              },
            },
          )
            .then(({ data }) => {
              if (data) {
                history.push('/owner');
              }
              // need to send to owner on validation
            });
        }
      });
    // TODO: data is the entire bar object
    axios.post('/db/bar/id', { params })
      .then(({ data }) => {
        setBarId(data[0].id);
      });
  };
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
        <TextField label="Email" onChange={(e) => { setEmail(e.target.value); }} />
      </Grid>
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <TextField label="Password" onChange={(e) => { setPassword(e.target.value); }} />
      </Grid>
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          onClick={() => { credentialsSubmit(); }}
        >
          Submit
        </Button>
      </Grid>
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.backBtn}

      >
        <Button
          color="primary"
          onClick={() => setLandingView('signin')}
        >
          Back
        </Button>
      </Grid>
    </Grid>
  );
};

export default OwnerCredentials;
