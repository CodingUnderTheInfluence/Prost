import React, { useEffect, useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import Axios from 'axios';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const clientId = process.env.GOOGLE_CLIENT_ID;

const SignUpGoogleButton = ({
  setId,
  setProfileImage,
  setUsername,
  setGEmail,
  setLandingView,
}) => {
  const onSuccess = async (res) => {
    const token = res.tokenId;
    const profile = res.profileObj;
    const googleProfile = {
      gProfile: res.profileObj,
    };
    const googleToken = {
      authToken: token,
    };
    setGEmail(res.profileObj.email);
    setId(res.profileObj.googleId);
    setProfileImage(res.profileObj.imageUrl);
    setUsername(res.profileObj.name);

    Axios.post('/db/customer/register', { googleProfile, googleToken })
      .then(({ data }) => {
        if (data === 'customer') {
          console.info('THIS CUSTOMER HAS BEEN FOUND');
        } else if (data === 'form') {
          localStorage.setItem('customerToken', res.tokenId);
        }
      })
      .catch((err) => console.warn(err));

    Axios.post('/db/maps', {
      userName: profile.name,
      gId: profile.googleId,
    })
      .then((data) => console.info('in the database', data))
      .catch((err) => console.error('error in post to maps', err));
    setLandingView('customerSignUp');
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
            SignIn with Google
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

export default SignUpGoogleButton;
