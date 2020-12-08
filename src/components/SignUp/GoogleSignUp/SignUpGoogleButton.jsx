import React, { useEffect, useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import Axios from 'axios';
import { Button, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const clientId = process.env.GOOGLE_CLIENT_ID;

const SignUpGoogleButton = ({
  setId,
  setProfileImage,
  setUsername,
  setGEmail,
  setLandingView,
}) => {
  const history = useHistory();
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
    localStorage.setItem('username', profile.name);
    localStorage.setItem('gId', profile.googleId);

    Axios.post('/db/customer/register', { googleProfile, googleToken })
      .then(({ data }) => {
        if (data === 'customer') {
          localStorage.removeItem('customerToken');
          localStorage.removeItem('ownerToken');
          localStorage.removeItem('gId');
          localStorage.removeItem('username');
          history.push('/');
        }
        if (data === 'form') {
          localStorage.setItem('customerToken', res.tokenId);
          setLandingView('customerSignUp');
        }
      })
      .catch((err) => console.warn(err));

    Axios.post('/db/maps', {
      userName: profile.name,
      gId: profile.googleId,
    })
      .then((data) => console.info('in the database', data))
      .catch((err) => console.error('error in post to maps', err));
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
            size="large"
          >
            Register with Google
          </Button>
        )}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy="single_host_origin"
      />
    </div>
  );
};

export default SignUpGoogleButton;
