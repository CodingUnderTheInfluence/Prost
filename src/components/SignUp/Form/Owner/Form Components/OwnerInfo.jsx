import React, { useState, useEffect } from 'react';
import {
  Grid,
  Button,
  Typography,
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import axios from 'axios';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    margin: '5px 0 5px 0',
  },
  backBtn: {
    opacity: '60%',
  },
}));
const OwnerInfo = ({
  setCounter,
  barName,
  address,
  city,
  state,
  zip,
  number,
  lat,
  lng,
  image,
  capacity,
  setBarId,
  handleNext,
  handleBack,
  activeStep,
}) => {
  const history = useHistory();
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [firstName, setFirst] = useState('');
  const [lastName, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [values, setValues] = useState({
    password: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const registerBar = () => {
    const params = {
      username,
      firstName,
      lastName,
      email,
      password: values.password,
    };
    return axios.post('/db/owner/register', { params })
      .then(({ data }) => data.owner.id)
      .catch((err) => { console.warn(err); });
  };

  const createBar = (data) => {
    const bparams = {
      ownerId: data,
      barName,
      address,
      city,
      state,
      zip,
      number,
      lat,
      lng,
      image,
      capacity,
    };
    return axios.post('/db/bar/create', { bparams })
      .then(({ data }) => {
        setBarId(data.id);
      })
      .catch((err) => { console.warn(err); });
  };

  const handleAll = async () => {
    const barRegistration = await registerBar();
    await createBar(barRegistration);
    await history.push('/owner');
  };

  return (
    <Grid container direction="column" justify="center" column="center">
      <Grid item container direction="row" justify="center" column="center" className={classes.textField}>
        <TextField
          id="outlined-basic"
          variant="outlined"
          required
          label="User Name"
          onChange={(e) => { setUsername(e.target.value); }}
        />
      </Grid>
      <Grid item container direction="row" justify="center" column="center" className={classes.textField}>
        <TextField
          id="outlined-basic"
          variant="outlined"
          required
          label="First Name"
          onChange={(e) => { setFirst(e.target.value); }}
        />
      </Grid>
      <Grid item container direction="row" justify="center" column="center" className={classes.textField}>
        <TextField
          id="outlined-basic"
          variant="outlined"
          required
          label="Last Name"
          onChange={(e) => { setLast(e.target.value); }}
        />
      </Grid>
      <Grid item container direction="row" justify="center" column="center" className={classes.textField}>
        <TextField
          id="outlined-basic"
          variant="outlined"
          required
          label="Email"
          onChange={(e) => { setEmail(e.target.value); }}
        />
      </Grid>
      <Grid item container direction="row" justify="center" alignItems="center" column="center">
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
      <Button
        variant="contained"
        size="medium"
        color="primary"
        onClick={() => {
          handleAll();
          handleNext();
        }}
      >
        Submit
      </Button>
      <Button
        size="small"
        color="primary"
        className={classes.backBtn}
        onClick={() => {
          handleBack();
          setCounter(1);
        }}
      >
        Back
      </Button>
    </Grid>
  );
};

export default OwnerInfo;
