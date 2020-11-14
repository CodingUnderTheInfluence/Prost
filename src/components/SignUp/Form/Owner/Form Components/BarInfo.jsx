import React, { useState, useEffect } from 'react';
import {
  Grid,
  Button,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';
import axios from 'axios';
import BarSearch from './BarSearch.jsx';

const useStyles = makeStyles((theme) => ({
  search: {
    margin: '10px 0 10px 0',
  },
}));

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
    setLandingView,
    handleNext,
    handleBack,
    activeStep,
  },
) => {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      justify="center"
      column="center"
    >
      <Grid
        item
        container
        direction="row"
        justify="center"
        column="center"
      >
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
          setLandingView={setLandingView}
          handleNext={handleNext}
          handleBack={handleBack}
          activeStep={activeStep}
        />
      </Grid>
    </Grid>
  );
};

export default BarInfo;
