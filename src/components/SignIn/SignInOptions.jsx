import React from 'react';
import {
  Grid,
  Button,
  makeStyles,
  Typography,
  Divider,
} from '@material-ui/core';
import Login from '../Login.jsx';

const useStyles = makeStyles(() => ({
  background: {
    height: '100vh',
    width: '100%',
  },
  buttons: {
    margin: '5px 0 10px 0',
  },
  header: {
    width: '50%',
  },
  backBtn: {
    opacity: '60%',
  },
}));

const SignInOptions = ({
  setLandingView,
  setDbId,
  setId,
  setProfileImage,
  setUsername,
}) => {
  const classes = useStyles();
  return (
    <div
      className={classes.background}
    >
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid
          item
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.buttons}
        >
          <Login
            setDbId={setDbId}
            setId={setId}
            setProfileImage={setProfileImage}
            setUsername={setUsername}
          />
        </Grid>
        <Grid
          item
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.buttons}
        >
          <Button
            size="large"
            onClick={() => {
              setLandingView('ownerCredentials');
            }}
            variant="contained"
            color="primary"
          >
            Business Sign In
          </Button>
        </Grid>
        <Grid
          item
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.buttons}
        >
          <Button
            size="small"
            color="primary"
            className={classes.backBtn}
            onClick={() => setLandingView('')}
          >
            Back
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
export default SignInOptions;
