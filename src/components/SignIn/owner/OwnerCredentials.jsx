import React, { useState } from 'react';
import { Grid, Button, TextField } from '@material-ui/core';
import axios from 'axios';

function OwnerCredentials({ setViewValue }) {
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
          console.info('TRY AGAIN');
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
                setViewValue('OwnerView');
              }
              // need to send to owner on validation
            });
        }
      });
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
