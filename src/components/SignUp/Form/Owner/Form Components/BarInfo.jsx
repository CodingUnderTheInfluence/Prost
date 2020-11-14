import React, { useState, useEffect } from 'react';
import {
  Grid,
  Button,
  TextField,
  Typography,
} from '@material-ui/core';
import axios from 'axios';
import BarSearch from './SearchPlace.jsx';

const BarInfo = (
  {
    setCounter,
    mapLatLng,
    setBarName,
    setAddress,
    setCity,
    setState,
    setZip,
    setNumber,
    setLat,
    setLng,
    setImage,
    setOccupency,
    barName,
    address,
    number,
  },
) => (
  <Grid container direction="column" justify="center" column="center">
    <Grid item container direction="row" justify="center" column="center">
      <Typography variant="subtitle1">
        Find Your Bar!
      </Typography>
    </Grid>
    <Grid item container direction="row" justify="center" column="center">
      <BarSearch
        setCounter={setCounter}
        setBarName={setBarName}
        setAddress={setAddress}
        setCity={setCity}
        setState={setState}
        setZip={setZip}
        setNumber={setNumber}
        setLat={setLat}
        setLng={setLng}
        setImage={setImage}
        barName={barName}
        address={address}
        number={number}
        setOccupency={setOccupency}
      />
    </Grid>
  </Grid>
);

export default BarInfo;
