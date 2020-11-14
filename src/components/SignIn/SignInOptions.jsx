import React from 'react';
import { Grid, Button } from '@material-ui/core';
import Login from '../Login.jsx';
import OwnerLogin from './owner/OwnerLogin.jsx';

const SignInOptions = ({
  setLandingView,
  setDbId,
  setId,
  setProfileImage,
  setUsername,
}) => (
  <div>
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item container direction="row" justify="center" alignItems="center">
        <h1> PLEASE SIGN IN HERE</h1>
      </Grid>
      <Grid item container direction="row" justify="center" alignItems="center">
        <Login
          setDbId={setDbId}
          setId={setId}
          setProfileImage={setProfileImage}
          setUsername={setUsername}
        />
      </Grid>
      <Grid item container direction="row" justify="center" alignItems="center">
        <Button onClick={() => {
          setLandingView('ownerCredentials');
        }}
        >
          Owner Login
        </Button>
      </Grid>
    </Grid>
  </div>
);

export default SignInOptions;
