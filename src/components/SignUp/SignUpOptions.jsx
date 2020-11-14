import React, { useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import OwnerForm from './Form/Owner/OwnerForm.jsx';
import CustomerSignUpForm from './Form/customer/CustomerSignUpForm.jsx';
import SignUpGoogleButton from './GoogleSignUp/SignUpGoogleButton.jsx';

const SignUpOptions = ({
  setId,
  setProfileImage,
  setUsername,
  setGEmail,
  setLandingView,
}) => (
  <div>
    <Grid item container direction="row" justify="center" alignItems="center">
      <h1>Register</h1>
    </Grid>
    <Grid item container direction="row" justify="center" alignItems="center">
      <SignUpGoogleButton
        setId={setId}
        setProfileImage={setProfileImage}
        setUsername={setUsername}
        setGEmail={setGEmail}
        setLandingView={setLandingView}
      />
    </Grid>
    <Grid item container direction="row" justify="center" alignItems="center">
      <Button
        variant="outlined"
        color="primary"
        onClick={() => {
          setLandingView('ownerSignUp');
        }}
      >
        Owner
      </Button>
    </Grid>
  </div>
);

export default SignUpOptions;
