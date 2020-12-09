import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import axios from 'axios';
import CustomerList from './CustomerList.jsx';

const BarList = ({ barId }) => {
  const [customerList, setCustomerList] = useState([]);

  const fetchCustomers = () => {
    axios.get(`/db/cb/list?barId=${barId}`)
      .then(({ data }) => {
        setCustomerList(data);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  if (customerList.length === 0) {
    return (
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item container direction="row" justify="center" alignItems="center">
          <Typography variant="subtitle1">
            No Customers Currently Checked In
          </Typography>
        </Grid>
      </Grid>
    );
  }
  return (
    <CustomerList customerList={customerList} barId={barId} />
  );
};
export default BarList;
