import React from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId = process.env.GOOGLE_CLIENT_ID;
const Logout = ({ setViewValue }) => {
  const onSuccess = () => {
    localStorage.removeItem('customerToken');
    localStorage.removeItem('ownerToken');
    localStorage.removeItem('gId');
    localStorage.removeItem('username');
    setViewValue('Landing');
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
};

export default Logout;
