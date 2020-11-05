import React, { useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import OwnerForm from '../Form/Owner/OwnerForm.jsx';
import CustomerSignUpForm from './Form/CustomerSignUpForm.jsx';
import SignUpGoogleButton from './GoogleSignUp/SignUpGoogleButton.jsx';

const SignUp = ({
  setViewValue,
  setId,
  setProfileImage,
  setUsername,
  gId,
  profileImage,
  username,
  gEmail,
  setGEmail,
  mapLatLng,
}) => {
  const [counter, setCounter] = useState(0);
  const [formCounter, setFormCounter] = useState(0);
  const [isClicked, setClicked] = useState(false);
  const handleClick = () => {
    isClicked ? setClicked(false) : setClicked(true);
  };

  const setFormView = () => {
    if (formCounter === 1) {
      return <OwnerForm setViewValue={setViewValue} mapLatLng={mapLatLng} />;
    } if (formCounter === 2) {
      return (
        <CustomerSignUpForm
          setViewValue={setViewValue}
          setId={setId}
          gId={gId}
          setProfileImage={setProfileImage}
          setUsername={setUsername}
          username={username}
          profileImage={profileImage}
          gEmail={gEmail}
        />
      );
    }
    return (<div />);
  };

  const setView = () => {
    if (counter === 1) {
      return (
        <div>
          <Grid item container direction="row" justify="center" alignItems="center">
            <SignUpGoogleButton
              setViewValue={setViewValue}
              setId={setId}
              setProfileImage={setProfileImage}
              setUsername={setUsername}
              setFormCounter={setFormCounter}
              setGEmail={setGEmail}
            />
          </Grid>
          <Grid item container direction="row" justify="center" alignItems="center">
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                setCounter(0);
                setFormCounter(1);
              }}
            >
              Owner
            </Button>
          </Grid>
        </div>
      );
    }
    return (<div />);
  };

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item container direction="row" justify="center" alignItems="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleClick();
            setCounter(1);
          }}
        >
          SignUp
        </Button>
      </Grid>
      <Grid item container direction="row" justify="center" alignItems="center">
        {isClicked ? setView() : (<div />)}
      </Grid>
      <Grid item container direction="row" justify="center" alignItems="center">
        {setFormView()}
      </Grid>
    </Grid>
  );
};

export default SignUp;
