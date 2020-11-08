import React, { useState, useEffect } from 'react';
import {
  Grid,
  Button,
  TextField,
  Typography
} from '@material-ui/core';
import BarSearch from './SearchPlace.jsx'
import axios from 'axios';

const BarInfo = (
  { setCounter,
    mapLatLng,
    setBarName,
    setAddress,
    setCity,
    setState,
    setZip,
    setNumber }
) => {

  return (
    <Grid container direction="column" justify="center" column="center">
      <Grid item container direction="row" justify="center" column="center">
        <Typography variant="subtitle1">
          Find Your Bar!
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
      <Grid item container direction="row" justify="center" column="center">
        <BarSearch />
      </Grid>
      <Button
        variant="outlined"
        onClick={() => {
          setCounter(2);
        }}
      >
        Next
      </Button>
    </Grid>
  );
}

export default BarInfo;
