import React, { useEffect, useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import Axios from 'axios';
import { Button } from '@material-ui/core';

const clientId = '933644302187-agamsig0qalm5oi4fd44v11hfffpchs8.apps.googleusercontent.com';

const Login = ({
  setViewValue, setId, setProfileImage, setUsername,
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
          <Button variant="outlined" color="primary" onClick={renderProps.onClick} disabled={renderProps.disabled}>
            Login Here
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
