import React from 'react';
import { Grid, Button } from '@material-ui/core';
import SignIn from './SignIn/SignIn.jsx';
import SignUp from './SignUp/SignUp.jsx';

const LandingPage = ({
  setDbId,
  setViewValue,
  setId,
  setProfileImage,
  setUsername,
  gId,
  profileImage,
  username,
  setGEmail,
  gEmail,
  mapLatLng,
}) => (
    <Grid container direction="column">
      <Grid item container direction="row" justify="center" alignItems="center">
        <img
          src="https://i.imgur.com/xqxjCwz.png"
          alt="Logo"
          style={{ maxWidth: '300px', maxHeight: '200px' }}
        />
      </Grid>
      <Grid item container direction="row" justify="center" alignItems="center" style={{ margin: '10px 0 10px 0' }}>
        <SignIn
          setDbId={setDbId}
          setViewValue={setViewValue}
          setId={setId}
          setProfileImage={setProfileImage}
          setUsername={setUsername}
          gId={gId}
          username={username}
          profileImage={profileImage}
        />
      </Grid>
      <Grid item container direction="row" justify="center" alignItems="center" style={{ margin: '10px 0 10px 0' }}>
        <SignUp
          setViewValue={setViewValue}
          setId={setId}
          setProfileImage={setProfileImage}
          setUsername={setUsername}
          gId={gId}
          username={username}
          profileImage={profileImage}
          setGEmail={setGEmail}
          gEmail={gEmail}
          mapLatLng={mapLatLng}
        />
      </Grid>
    </Grid>
  );

export default LandingPage;
