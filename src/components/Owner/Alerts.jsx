import React, { useEffect, useState } from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import axios from 'axios';
import AlertList from './AlertList.jsx';

const useStyles = makeStyles(() => ({
  line: {
    backgroundColor: '#0365b0',
    width: '80%',
    height: '2px',
  },
  font: {
    fontSize: '18pt',
  },
}));

const Alerts = ({ barId }) => {
  const classes = useStyles();
  const [customerList, setCustomerList] = useState([]);

  /*
   This function grabs all customers and their information that have drink >= 8
  */
  const fetchAlerts = () => {
    axios.get(`/db/drinks/alerts?barId=${barId}`)
      .then(({ data }) => {
        data.map((customer) => axios.get(`/db/customer/getCustomerById?customerId=${customer.id_customer}`)
          .then(({ data }) => {
            const listCopy = customerList.slice();
            listCopy.push(data);
            setCustomerList(listCopy);
          }));
      })
      .catch((err) => console.warn(err));
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  if (customerList.length === 0) {
    return (
      <Grid item container direction="row" justify="center" alignItems="center">
        <Typography variant="subtitle">
          No Alerts
        </Typography>
      </Grid>
    );
  }
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
        alignItems="center"
      >
        <div className={classes.font}>
          Stop Serving These Customers
        </div>
      </Grid>
      <hr className={classes.line} />
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <AlertList customerList={customerList} />
      </Grid>
    </Grid>
  );
};

export default Alerts;
