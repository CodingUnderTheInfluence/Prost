import React from 'react';
import { GoogleLogout } from 'react-google-login';
import { useHistory } from 'react-router-dom';

const clientId = process.env.GOOGLE_CLIENT_ID;
const Logout = ({ setViewValue }) => {
  let history = useHistory();
  const onSuccess = () => {
    localStorage.removeItem('customerToken');
    localStorage.removeItem('ownerToken');
    localStorage.removeItem('gId');
    localStorage.removeItem('username');
    history.push('/');
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
