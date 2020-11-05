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
<<<<<<< HEAD
=======
    console.info('[Login Success] currentUser:', res.profileObj.email);
>>>>>>> 5e56945... (update) Ability to sign up with google and sign in with google complete
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
