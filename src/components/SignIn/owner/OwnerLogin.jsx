import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import OwnerCredentials from './OwnerCredentials.jsx';

const OwnerLogin = ({ setBarId, setLandingView }) => (
  <div>
    <Button
      variant="outlined"
      color="primary"
      onClick={setLandingView('ownerCredentials')}
    >
      Owner Login
    </Button>
  </div>
);

export default OwnerLogin;
