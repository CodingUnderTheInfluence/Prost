import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import CustomerList from './CustomerList.jsx';

const BarList = ({ customerList, barId }) => {
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
