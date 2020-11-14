import React, { useEffect, useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import Axios from 'axios';
import { Button } from '@material-ui/core';
import { Redirect, useHistory } from 'react-router-dom';

const clientId = process.env.GOOGLE_CLIENT_ID;

const Login = ({
  setId,
  setProfileImage,
  setUsername,
  setDbId,
}) => {
  const history = useHistory();
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
          localStorage.setItem('customerToken', res.tokenId);
          history.push('/customer');
        } else if (data === 'Owner') {
          localStorage.setItem('ownerToken', res.tokenId);
          history.push('/owner');
        } else if (data === 'form') {
          console.info('PLEASE REGISTER WITH OUR APP');
            <Redirect to="/" />;
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
            size="large"
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
