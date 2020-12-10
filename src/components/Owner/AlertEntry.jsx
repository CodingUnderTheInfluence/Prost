import React, { useState, useEffect } from 'react';
import {
  Grid, Button, Typography, makeStyles,
} from '@material-ui/core';
import axios from 'axios';
import PhoneIcon from '@material-ui/icons/Phone';

const useStyles = makeStyles(() => ({
  container: {
    marginTop: '10px',
    border: 'solid 1px #0365b0',
    borderRadius: '5pt',
    padding: '10px',
    width: '80%',
  },
  line: {
    backgroundColor: '#0365b0',
    opacity: '50%',
    height: '20px',
    width: '1px',
  },
}));

const AlertEntry = ({ customer }) => {
  const classes = useStyles();

  if (customer.length === 0) {
    return (
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item container direction="row" justify="center" alignItems="center">
          <Typography variant="subtitle1">
            No Customers on Alert List
          </Typography>
        </Grid>
      </Grid>
    );
  }
  return (
    <Grid container direction="column" justify="center" alignItems="center" className={classes.container}>
      <Grid item container direction="row" justify="center" alignItems="center">
        <Grid container direction="column" justify="center" alignItems="center" xs={5}>
          <Typography variant="subtitle1">
            {`${customer.first_name} ${customer.last_name}`}
          </Typography>
        </Grid>
        <hr className={classes.line} />
        <Grid container direction="column" justify="center" alignItems="center" xs={3}>
          <a href={`tel:+1${customer.phone_number}`}><PhoneIcon size="md" /></a>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AlertEntry;
