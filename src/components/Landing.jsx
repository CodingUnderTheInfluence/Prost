import React, { useState } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import Options from './Options.jsx';
import SignInOptions from './SignIn/SignInOptions.jsx';
import OwnerCredentials from './SignIn/owner/OwnerCredentials.jsx';
import SignUpOptions from './SignUp/SignUpOptions.jsx';
import OwnerForm from './SignUp/Form/Owner/OwnerForm.jsx';
import CustomerSignUpForm from './SignUp/Form/customer/CustomerSignUpForm.jsx';

const useStyles = makeStyles(() => ({
  image: {
    maxWidth: '300px',
    maxHeight: '200px',
  },
  containers: {
    position: 'inherit',
    marginTop: '20vh',
  },
}));

const Landing = ({
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
  const classes = useStyles();

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
    }
    if (landingView === 'ownerCredentials') {
      return (
        <OwnerCredentials
          setBarId={setBarId}
          setLandingView={setLandingView}
        />
      );
    }
    if (landingView === 'signUp') {
      return (
        <SignUpOptions
          setId={setId}
          setProfileImage={setProfileImage}
          setUsername={setUsername}
          gId={gId}
          profileImage={profileImage}
          username={username}
          gEmail={gEmail}
          setGEmail={setGEmail}
          mapLatLng={mapLatLng}
          setBarId={setBarId}
          setLandingView={setLandingView}
        />
      );
    }
    if (landingView === 'ownerSignUp') {
      return (
        <OwnerForm
          mapLatLng={mapLatLng}
          setBarId={setBarId}
          setLandingView={setLandingView}
        />
      );
    }
    if (landingView === 'customerSignUp') {
      return (
        <CustomerSignUpForm
          setId={setId}
          gId={gId}
          setProfileImage={setProfileImage}
          setUsername={setUsername}
          username={username}
          profileImage={profileImage}
          gEmail={gEmail}
          setLandingView={setLandingView}
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
    <div className={classes.containers}>
      <Grid container direction="column">
        <Grid
          item
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <img
            src="https://i.imgur.com/xqxjCwz.png"
            alt="Logo"
            className={classes.image}
          />
        </Grid>
        <Grid
          item
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          {renderView()}
        </Grid>
      </Grid>
    </div>
  );
};

export default Landing;
