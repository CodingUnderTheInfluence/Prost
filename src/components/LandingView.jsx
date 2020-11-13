import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import Options from './Options.jsx';
import SignInOptions from './SignIn/SignInOptions.jsx';
import OwnerLogin from './SignIn/owner/OwnerLogin.jsx';
import Login from './Login.jsx';

const LandingView = ({
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
  setBarId,
  barId,
}) => {
  const [landingView, setLandingView] = useState();

  const renderView = () => {
    if (landingView === 'signin') {
      return (
        <SignInOptions
          setViewValue={setViewValue}
          setId={setId}
          setProfileImage={setProfileImage}
          setUsername={setUsername}
          setDbId={setDbId}
          setBarId={setBarId}
          setLandingView={setLandingView}
        />
      );
    } if (landingView === 'ownerLogin') {
      return (
        <OwnerLogin
          setViewValue={setViewValue}
          setBarId={setBarId}
        />
      );
    }
    return (
      <Options
        setDbId={setDbId}
        setViewValue={setViewValue}
        setId={setId}
        setProfileImage={setProfileImage}
        setUsername={setUsername}
        gId={gId}
        profileImage={profileImage}
        username={username}
        setGEmail={setGEmail}
        gEmail={gEmail}
        mapLatLng={mapLatLng}
        setBarId={setBarId}
        barId={barId}
        setLandingView={setLandingView}
      />
    );
  };

  return (
    <Grid container direction="column">
      {renderView()}
    </Grid>
  );
};

export default LandingView;
