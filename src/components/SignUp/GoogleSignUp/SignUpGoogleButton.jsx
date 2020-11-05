import React, { useEffect, useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import Axios from 'axios';
import { Button } from '@material-ui/core';

const clientId = '933644302187-agamsig0qalm5oi4fd44v11hfffpchs8.apps.googleusercontent.com';

const SignUpGoogleButton = ({
  setViewValue, setId, setProfileImage, setUsername, setFormCounter, profileImage,
  username, setGEmail,
}) => {
  const onSuccess = async (res) => {
    console.info('[Login Success] currentUser:', res.profileObj.email);
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
    setProfileImage(profile.imageUrl);
    setUsername(profile.name);
    // const formCounter = await setFormCounter(2);
    // console.info(localStorage);
    // Axios.post('/db/customer', { googleToken }); //this is a post to check for the google token
    Axios.post('/db/customer/register', { googleProfile, googleToken })
      .then(({ data }) => {
        // console.info(data);
        if (data === 'customer') {
          console.info('THIS CUSTOMER HAS BEEN FOUND');
        } else if (data === 'form') {
          console.info('PLEASE REGISTER WITH OUR APP');
          localStorage.setItem('customerToken', res.tokenId);
          // formCounter;
          setFormCounter(2);
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

export default SignUpGoogleButton;
