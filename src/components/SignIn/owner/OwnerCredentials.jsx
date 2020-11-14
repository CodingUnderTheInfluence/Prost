import React, { useState, useEffect } from 'react';
import {
  Grid,
  Button,
  TextField,
  makeStyles,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Input,
  InputLabel,
  InputAdornment,
  OutlinedInput,
} from '@material-ui/core';
import axios from 'axios';
import clsx from 'clsx';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  button: {
    margin: '10px 0 10px 0',
  },
  backBtn: {
    opacity: '60%',
    margin: '0 0 0 0',
  },
  textField: {
    margin: '5px 0 5px 0',
  },
}));

const OwnerCredentials = ({ setBarId, setLandingView }) => {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState();
  const [values, setValues] = useState({
    password: '',
    showPassword: false,
  });

  /*
    These functions control the password handling
  */
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  /*
    This function handles credential submitting for owner
  */
  const credentialsSubmit = () => {
    const params = {
      email,
      password: values.password,
    };
    axios.post('/db/owner/login', { params })
      .then(({ data }) => {
        if (data === 'Email or Password Incorrect') {
        }
        localStorage.setItem('ownerToken', data);
        axios({
          method: 'POST',
          url: '/db/owner/is-verify',
          headers: {
            token: localStorage.ownerToken,
          },
        })
          .then(({ data }) => {
            if (data) history.push('/owner');
          })
          .catch((err) => console.warn(err));
      })
      .catch((err) => console.warn(err));
    axios.post('/db/bar/id', { params })
      .then(({ data }) => setBarId(data[0].id))
      .catch((err) => console.warn(err));
  };

  return (
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
      >
        <TextField
          required
          variant="outlined"
          label="Email"
          onChange={(e) => { setEmail(e.target.value); }}
          className={classes.textField}
        />
      </Grid>
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
          <InputLabel
            required
            htmlFor="outlined-adornment-password"
          >
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={(
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )}
            labelWidth={70}
          />
        </FormControl>
      </Grid>
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          onClick={() => { credentialsSubmit(); }}
        >
          Submit
        </Button>
      </Grid>
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.backBtn}

      >
        <Button
          color="primary"
          onClick={() => setLandingView('signin')}
        >
          Back
        </Button>
      </Grid>
    </Grid>
  );
};

export default OwnerCredentials;
