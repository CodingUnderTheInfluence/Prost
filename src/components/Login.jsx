import React, { useEffect, useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import Axios from 'axios';
import { Button } from '@material-ui/core';

const clientId = process.env.GOOGLE_CLIENT_ID;

const Login = ({
  setViewValue,
  setId,
  setProfileImage,
  setUsername,
  setDbId,
}) => {
  const onSuccess = (res) => {
    const token = res.tokenId;
    const profile = res.profileObj;
    const googleProfile = {
      gProfile: profile,
    };
    const googleToken = {
      authToken: token,
    };
    setId(profile.googleId);
    setProfileImage(profile.imageUrl);
    setUsername(profile.name);
    localStorage.setItem('username', profile.name);
    localStorage.setItem('gId', profile.googleId);
    Axios.post('/db/customer/check', { googleProfile, googleToken })
      .then(({ data }) => {
        if (data === 'customer') {
          setViewValue('CustomerView');
          localStorage.setItem('customerToken', res.tokenId);
        } else if (data === 'Owner') {
          setViewValue('OwnerView');
          localStorage.setItem('ownerToken', res.tokenId);
        } else if (data === 'form') {
          console.info('PLEASE REGISTER WITH OUR APP');
        }
      });
  };

  const onFailure = (res) => {
    console.info('[Login Failure] res:', res);
  };
  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        render={(renderProps) => (
          <Button
            variant="contained"
            color="primary"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            Continue with Google
          </Button>
        )}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy="single_host_origin"
        style={{ marginTop: '100px' }}
        isSignedIn
      />
    </div>
  );
};

export default Login;
