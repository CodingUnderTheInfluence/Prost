import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import Options from './Options.jsx';
import SignInOptions from './SignIn/SignInOptions.jsx';
import OwnerCredentials from './SignIn/owner/OwnerCredentials.jsx';
import SignUpOptions from './SignUp/SignUpOptions.jsx';
import OwnerForm from './SignUp/Form/Owner/OwnerForm.jsx';
import CustomerSignUpForm from './SignUp/Form/customer/CustomerSignUpForm.jsx';

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

export default Landing;
