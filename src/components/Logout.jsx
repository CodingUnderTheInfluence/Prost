import React from 'react';
import { Button } from '@material-ui/core';
import { GoogleLogout } from 'react-google-login';
import { useHistory } from 'react-router-dom';

const clientId = process.env.GOOGLE_CLIENT_ID;
const Logout = () => {
  const history = useHistory();
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
        render={(renderProps) => (
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            Logout
          </Button>
        )}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
};

export default Logout;
