import React, { useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import axios from 'axios';
import AlertEntry from './AlertEntry.jsx';

const Alerts = ({ barId, customerList, count }) => {
  let blank;

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item container direction="row" justify="center" alignItems="center">
        <Typography variant="h5">
          Stop serving these customers
        </Typography>
      </Grid>
      <Grid item container direction="row" justify="center" alignItems="center">
        {customerList.map((customer) => <AlertEntry customer={customer} barId={barId} count={count} />)}
      </Grid>
    </Grid>
  );
};

export default Alerts;
