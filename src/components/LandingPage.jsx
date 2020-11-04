import React from 'react';
import Login from './Login.jsx';
import Logout from './Logout.jsx';
import OwnerLogin from './SignIn/owner/OwnerLogin.jsx';
import { Grid, Button } from '@material-ui/core';

const LandingPage = ({ setViewValue, setId, setProfileImage, setUsername, setUserId }) => {
  return (
    <Grid container direction='column' >
      <Grid item container direction="row" justify="center" alignItems="center">
        <img src="https://i.imgur.com/xqxjCwz.png" style={{ maxWidth: '300px', maxHeight: '200px' }} />
      </Grid>
      <Grid item container direction="row" justify="center" alignItems="center" style={{ margin: '10px 0 10px 0' }}>
        <Login setViewValue={setViewValue} setId={setId} setUserId={setUserId} setProfileImage={setProfileImage} setUsername={setUsername} />
      </Grid>
      <Grid item container direction="row" justify="center" alignItems="center" style={{ margin: '10px 0 10px 0' }}>
        <OwnerLogin />
      </Grid>
    </Grid>
  );
};

export default LandingPage;