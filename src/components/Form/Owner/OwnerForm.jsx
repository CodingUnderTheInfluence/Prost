import React, { useState, useEffect } from 'react';
import {
  Grid,
  Button,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
} from '@material-ui/core';
import axios from 'axios';
import SafetyDialog from './Dialog.jsx';
import BarInfo from './Form Components/BarInfo.jsx';
import OwnerInfo from './Form Components/OwnerInfo.jsx';

function OwnerForm({ setViewValue, mapLatLng }) {
  const [counter, setCounter] = useState(0);
  const [barName, setBarName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [number, setNumber] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');

  const renderOwnerForm = () => {
    if (counter === 1) {
      return <BarInfo
        setCounter={setCounter}
        setBarName={setBarName}
        setAddress={setAddress}
        setCity={setCity}
        setState={setState}
        setZip={setZip}
        setNumber={setNumber}
        setLat={setLat}
        setLng={setLng}
        barName={barName}
        address={address}
        number={number}
      />;
    } if (counter === 2) {
      return <OwnerInfo
        setCounter={setCounter}
        setViewValue={setViewValue}
        barName={barName}
        address={address}
        city={city}
        state={state}
        zip={zip}
        number={number}
        lat={lat}
        lng={lng}
      />;
    }
    return (
      <SafetyDialog setCounter={setCounter} />
    );
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
        alignItems="center">
        {renderOwnerForm()}
      </Grid>
    </Grid>
  );
}

export default OwnerForm;
