import React, { useEffect, useState } from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import axios from 'axios';
import AlertEntry from './AlertEntry.jsx';

const Alerts = ({ barId }) => {
  const [customerList, setCustomerList] = useState([]);

  /*
    This function gets customers that are currently at the bar
  */
  // const fetchCustomers = () => {
  //   axios.get(`/db/cb/list?barId=${barId}`)
  //     .then(({ data }) => {
  //       setCustomerList(data);
  //     })
  //     .catch((err) => {
  //       console.warn(err);
  //     });
  // };

  // useEffect(() => {
  //   fetchCustomers();
  // }, []);

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item container direction="row" justify="center" alignItems="center">
        <Typography variant="subtitle1">
          Stop serving these customers
        </Typography>
      </Grid>
      <Grid item container direction="row" justify="center" alignItems="center">
        {customerList.map((customer) => <AlertEntry customer={customer} barId={barId} />)}
      </Grid>
    </Grid>
  );
};

export default Alerts;
