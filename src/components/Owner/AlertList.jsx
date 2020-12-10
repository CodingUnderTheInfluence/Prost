import React from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import AlertEntry from './AlertEntry.jsx';

const AlertList = ({ customerList }) => (
  <Grid container direction="column" justify="center" alignItems="center">
    <Grid item container direction="row" justify="center" alignItems="center">
      {customerList.map((customer) => (
        <AlertEntry
          customer={customer}
        />
      ))}
    </Grid>
  </Grid>
);

export default AlertList;
