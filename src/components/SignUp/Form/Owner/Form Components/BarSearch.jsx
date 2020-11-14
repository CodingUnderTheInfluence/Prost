/* eslint-disable camelcase */
import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import axios from 'axios';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useLoadScript } from '@react-google-maps/api';
import {
  Grid, Typography, Button, TextField, makeStyles,
} from '@material-ui/core';
import SearchBox from './SearchBox.jsx';

const libraries = ['places'];

const useStyles = makeStyles((theme) => ({
  box: {
    margin: '30px 0 30px 0',
  },
  field: {
    margin: '10px 0 0 0',
  },
  selection: {
    margin: '10px 0 20px 0',
  },
  button: {

  },
  backBtn: {
    opacity: '60%',
  },
}));

const searchBox = {
  boxSizing: 'border-box',
  border: '1px solid transparent',
  width: '80%',
  height: '40px',
  padding: '10px',
  borderRadius: '3px',
  outline: 'none',
  textOverflow: 'ellipses',
  position: 'absolute',
};

const BarSearch = ({
  setCounter,
  setLat,
  setLng,
  setBarName,
  setAddress,
  setCity,
  setState,
  setZip,
  setNumber,
  setImage,
  setOccupency,
  barName,
  address,
  number,
  setLandingView,
  handleNext,
  handleBack,
  activeStep,
}) => {
  const classes = useStyles();
  const [currentPosition, setCurrentPosition] = useState({
    lat: 29.951065,
    lng: -90.071533,
  });
  const [searchAddress, setSearchAddress] = useState('');
  const [selected, setSelected] = useState(false);

  const getPlaceInfo = useCallback((results) => {
    /*
        formatted_address: "701 W Judge Perez Dr, Chalmette, LA 70043, USA"
        name: "Lacy's Cue Sports Bar"
        */
    // get places info from search bar
    const {
      formatted_address,
      formatted_phone_number,
      name,
      photos,
      geometry: { location },
    } = results;
    const lat = location.lat();
    const lng = location.lng();
    setSearchAddress(formatted_address);
    setNumber(formatted_phone_number);
    setBarName(name);
    setLat(lat);
    setLng(lng);
    setImage(photos[0].getUrl());
    setSelected(true);
  }, []);
    // Check in
  const addBar = () => {
    if (!searchAddress) {

    } else {
      const arr = searchAddress.split(', ');
      const stateZip = arr[2].split(' ');
      setAddress(arr[0]);
      setCity(arr[1]);
      setState(stateZip[0]);
      setZip(stateZip[1]);
    }
  };

  // shows selected bar
  const showSelection = () => {
    if (selected) {
      return (
        <Grid item container direction="row" justify="center" alignItems="center" className={classes.selection}>
          <Typography variant="subtitle1">
            You have selected:
          </Typography>
          <Grid item container direction="row" justify="center" alignItems="center">
            {barName}
          </Grid>
          <Grid item container direction="row" justify="center" alignItems="center">
            {address}
          </Grid>
          <Grid item container direction="row" justify="center" alignItems="center">
            {number}
          </Grid>
        </Grid>
      );
    }
    return (<div />);
  };

  // populates places drop down
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) {
    return 'Error loading maps';
  }
  if (!isLoaded) {
    return 'Loading maps';
  }

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item container direction="row" justify="center" column="center">
        <TextField
          className={classes.field}
          variant="outlined"
          color="primary"
          label="Full Bar Capacity?"
          onChange={(e) => { setOccupency(e.target.value); }}
        />
      </Grid>
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.box}
      >
        <SearchBox
          currentPosition={currentPosition}
          searchBox={searchBox}
          getPlaceInfo={getPlaceInfo}
        />
      </Grid>
      <Grid item container direction="row" justify="center" alignItems="center">
        {showSelection()}
      </Grid>
      <Grid item container direction="row" justify="center" alignItems="center">
        <Button
          className={classes.button}
          variant="outlined"
          size="medium"
          color="primary"
          onClick={() => {
            addBar();
            setCounter(2);
            handleNext();
          }}
          disabled={activeStep === 2}
        >
          Next
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
          onClick={() => {
            setLandingView('signUp');
            handleNext();
          }}
        >
          Back
        </Button>
      </Grid>
    </Grid>
  );
};

export default BarSearch;
