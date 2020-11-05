import React, { useState, useEffect } from 'react';
import {
  Grid, Button, Typography, TextField, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel,
} from '@material-ui/core';
import axios from 'axios';

function BarInfo({ setCounter, mapLatLng }) {
  const [barName, setBarName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [number, setNumber] = useState('');

  const submitBarInfo = () => {
    const params = {
      barName,
      address,
      city,
      state,
      zip,
      number,
    };
    axios.post('/db/bar/create', { params });
  };

  return (
    <Grid container direction="column" justify="center" column="center">
      <Grid item container direction="row" justify="center" column="center">
        <Typography variant="subtitle1">
          Bar Information
        </Typography>
      </Grid>
      <Grid item container direction="row" justify="center" column="center">
        <TextField id="standard-basic" label="Bar Name" onChange={(e) => { setBarName(e.target.value); }} />
      </Grid>
      <Grid item container direction="row" justify="center" column="center">
        <TextField id="standard-basic" label="Address" onChange={(e) => { setAddress(e.target.value); }} />
      </Grid>
      <Grid item container direction="row" justify="center" column="center">
        <TextField id="standard-basic" label="City" onChange={(e) => { setCity(e.target.value); }} />
        <TextField id="standard-basic" label="State" onChange={(e) => { setState(e.target.value); }} />
        <TextField id="standard-basic" label="Zip" onChange={(e) => { setZip(e.target.value); }} />
      </Grid>
      <Grid item container direction="row" justify="center" column="center">
        <TextField id="standard-basic" label="Phone Number" onChange={(e) => { setNumber(e.target.value); }} />
      </Grid>
      <Button
        variant="outlined"
        onClick={() => {
          submitBarInfo();
          setCounter(2);
        }}
      >
        Next
      </Button>
    </Grid>
  );
}

export default BarInfo;
