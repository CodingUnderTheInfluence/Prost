import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';

const QrScanner = () => {
  let blank;

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item container direction="row" justify="center" alignItems="center">
        <Typography variant="subtitle1" justify="center" alignItems="center">
          Customer, _USER_NAME_, seems to have drank to much
        </Typography>
      </Grid>
      <Grid item container direction="row" justify="center" alignItems="center">
        <Typography variant="subtitle2">
          Call them a ride?<PhoneIcon />
        </Typography>
      </Grid>
    </Grid>
  );
};

export default QrScanner;
