import React, { useState } from 'react';
import OwnerCredentials from './OwnerCredentials.jsx';

const OwnerLogin = ({
  setViewValue,
  setBarId,
}) => (
  <div>
    <OwnerCredentials
      setViewValue={setViewValue}
      setBarId={setBarId}
    />
  </div>
);

export default OwnerLogin;
