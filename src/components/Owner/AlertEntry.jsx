import React, { useState, useEffect } from 'react';
import {
  Grid, Button, Typography, makeStyles,
} from '@material-ui/core';
import axios from 'axios';
import PhoneIcon from '@material-ui/icons/Phone';

const useStyles = makeStyles(() => ({
  spacer: {
    borderTop: 'solid 1px #4e71cc',
    margin: '5px 0 0 0',
  },
  container: {
    margin: '5px 0 0 0',
  },
  backBtn: {
    opacity: '60%',
  },
}));

const AlertEntry = ({ customer, barId }) => {
  const classes = useStyles();

  /*
    This function will grab customers who have had more than the alotted number of drinks
  */

  const fetchAlerts = () => {
    axios.get(`/db/drinks/alerts?customer=${customer}&barId=${barId}`)
      .then(({ data }) => console.log(data)); // should output customer
  };

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      TEST ALERT
    </Grid>
  );
};

export default AlertEntry;
