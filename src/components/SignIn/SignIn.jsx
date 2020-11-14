import React, { useState } from 'react';
import { Button } from '@material-ui/core';

const SignIn = ({
  setLandingView,
}) => (
  <div>
    <Button
      variant="contained"
      color="primary"
      onClick={() => {
        setLandingView('signin');
      }}
    >
      Sign In here
    </Button>
  </div>
);

export default SignIn;
