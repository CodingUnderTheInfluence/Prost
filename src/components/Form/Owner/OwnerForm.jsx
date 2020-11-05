import React, { useState, useEffect } from 'react';
import {
  Grid, Button, Typography, TextField, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel,
} from '@material-ui/core';
import axios from 'axios';
import SafetyDialog from './Dialog.jsx';
import BarInfo from './Form Components/BarInfo.jsx';
import OwnerInfo from './Form Components/OwnerInfo.jsx';

function OwnerForm({ setViewValue, mapLatLng }) {
  const [counter, setCounter] = useState(0);

  const renderOwnerForm = () => {
    if (counter === 1) {
      return <BarInfo setCounter={setCounter} />;
    } if (counter === 2) {
      return <OwnerInfo setCounter={setCounter} setViewValue={setViewValue} />;
    }
    return (
      <SafetyDialog setCounter={setCounter} />
    );
  };
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item container direction="row" justify="center" alignItems="center">
        {renderOwnerForm()}
      </Grid>
    </Grid>
  );
}

export default OwnerForm;
