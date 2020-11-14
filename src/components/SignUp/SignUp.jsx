import React, { useState } from 'react';
import { Grid, Button } from '@material-ui/core';

const SignUp = ({
  setLandingView,
}) => (
  <Grid container direction="row" justify="center" alignItems="center">
    <Button
      variant="contained"
      color="primary"
      onClick={() => {
        setLandingView('signUp');
      }}
    >
      SignUp
    </Button>
  </Grid>
);

export default SignUp;
