import React, { useState } from 'react';
import { Grid, Button, makeStyles } from '@material-ui/core';
import OwnerForm from './Form/Owner/OwnerForm.jsx';
import CustomerSignUpForm from './Form/customer/CustomerSignUpForm.jsx';
import SignUpGoogleButton from './GoogleSignUp/SignUpGoogleButton.jsx';

const useStyles = makeStyles(() => ({
  button: {
    margin: '5px 0 10px 0',
  },
  backBtn: {
    opacity: '60%',
    margin: '0 0 0 0',
  },
}));

const SignUpOptions = ({
  setId,
  setProfileImage,
  setUsername,
  setGEmail,
  setLandingView,
}) => {
  const classes = useStyles();
  return (
    <Grid container direction="column">
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <SignUpGoogleButton
          setId={setId}
          setProfileImage={setProfileImage}
          setUsername={setUsername}
          setGEmail={setGEmail}
          setLandingView={setLandingView}
        />
      </Grid>
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.button}
      >
        <Button
          variant="contained"
          color="primary"
          size="large"

          onClick={() => {
            setLandingView('ownerSignUp');
          }}
        >
          Register as Business
        </Button>
      </Grid>
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Button
          size="small"
          color="primary"
          className={classes.backBtn}
          onClick={() => setLandingView('')}
        >
          Back
        </Button>
      </Grid>
    </Grid>
  );
};

export default SignUpOptions;
