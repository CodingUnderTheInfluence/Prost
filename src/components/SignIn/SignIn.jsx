import React, { useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import Login from '../Login.jsx';
import OwnerLogin from './owner/OwnerLogin.jsx';

const SignIn = ({
  setId,
  setProfileImage,
  setUsername,
  setDbId,
  setBarId
}) => {
  const [counter, setCounter] = useState(0);
  const [isClicked, setClicked] = useState(false);
  const handleClick = () => {
    isClicked ? setClicked(false) : setClicked(true);
  };

  const setView = () => {
    if (counter === 1) {
      return (
        <div>
          <Grid container direction="column" justify="center" alignItems="center">
            <Grid item container direction="row" justify="center" alignItems="center">
              <Login
                setDbId={setDbId}
                setId={setId}
                setProfileImage={setProfileImage}
                setUsername={setUsername}
              />
            </Grid>
            <Grid item container direction="row" justify="center" alignItems="center">
              <OwnerLogin
                setBarId={setBarId}
              />
            </Grid>
          </Grid>
        </div>
      );
    }
    return (<div />);
  };
  return (
    <div>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleClick();
            setCounter(1);
          }}
        >
          Sign In here
        </Button>
      </div>
      <div>
        {isClicked ? setView() : (<div />)}
      </div>
    </div>
  );
};

export default SignIn;
