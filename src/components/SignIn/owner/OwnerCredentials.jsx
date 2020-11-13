import React, { useState, useEffect } from 'react';
import {
  Grid,
  Button,
  TextField,
  makeStyles,
} from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles({
  button: {
    padding: '5px',
    margin: '10px 0 10px 0',
  },
  fields: {
    padding: '5px',
    margin: '10px 0 10px 0',
  },
});

const OwnerCredentials = ({ setViewValue, setBarId }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const classes = useStyles();
  const credentialsSubmit = () => {
    const params = {
      email,
      password,
    };
    axios.post('/db/owner/login', { params })
      .then(({ data }) => {
        if (data === 'Email or Password Incorrect') {
          /*
          TODO: add snackbar components
          https://material-ui.com/components/snackbars/#snackbar
          */
        } else {
          localStorage.setItem('ownerToken', data);
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
                setViewValue('OwnerView');
              }
            })
            .catch((err) => console.warn(err));
        }
      });
    axios.post('/db/bar/id', { params })
      .then(({ bar }) => {
        setBarId(bar[0].id);
      })
      .catch((err) => console.warn(err));
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
        <TextField
          label="Email"
          onChange={(e) => { setEmail(e.target.value); }}
          className={classes.fields}
        />
      </Grid>
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <TextField
          label="Password"
          onChange={(e) => { setPassword(e.target.value); }}
          className={classes.fields}
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
          variant="outlined"
          onClick={() => { credentialsSubmit(); }}
          className={classes.button}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default OwnerCredentials;
