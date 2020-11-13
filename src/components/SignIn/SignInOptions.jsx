import React, { useState } from 'react';
import { Grid, Button, makeStyles } from '@material-ui/core';
import Login from '../Login.jsx';

const useStyles = makeStyles({
  button: {
    padding: '5px',
    margin: '10px 0 10px 0',
  },
});

const SignInOptions = ({
  setLandingView,
  setDbId,
  setViewValue,
  setId,
  setProfileImage,
  setUsername,
}) => {
  const classes = useStyles();
  return (
    <div>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item container direction="row" justify="center" alignItems="center">
          <Login
            setDbId={setDbId}
            setViewValue={setViewValue}
            setId={setId}
            setProfileImage={setProfileImage}
            setUsername={setUsername}
          />
        </Grid>
        <Grid item container direction="row" justify="center" alignItems="center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setLandingView('ownerLogin');
            }}
            className={classes.button}
          >
            Continue as Bar Owner
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignInOptions;
