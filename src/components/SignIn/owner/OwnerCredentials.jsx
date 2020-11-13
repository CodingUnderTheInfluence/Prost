import React, { useState, useEffect } from 'react';
import { Grid, Button, TextField } from '@material-ui/core';
import axios from 'axios';
import { LocalConvenienceStoreOutlined } from '@material-ui/icons';
import { useHistory } from 'react-router-dom'

const OwnerCredentials = ({ setBarId }) => {
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
          return;
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
                history.push('/owner')
              }
              // need to send to owner on validation
            });
        }
      });
    //TODO: data is the entire bar object
    axios.post('/db/bar/id', { params })
      .then(({ data }) => {
        setBarId(data[0].id)
      })
  };

  return (
    <Grid>
      <TextField label="Email" onChange={(e) => { setEmail(e.target.value); }} />
      <TextField label="Password" onChange={(e) => { setPassword(e.target.value); }} />
      <Button variant="outlined" onClick={() => { credentialsSubmit(); }}>
        Submit
      </Button>
    </Grid>
  );
}

export default OwnerCredentials;
