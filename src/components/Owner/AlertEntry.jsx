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

const AlertEntry = ({ customer, barId, count }) => {
  const classes = useStyles();
  const [state, setState] = useState();
  const [customerData, setCustomerData] = useState();
  const [nameFirst, setFirstName] = useState();
  const [nameLast, setLastName] = useState();
  const [number, setNumber] = useState();

  const grabAlerts = () => {
    axios.get(`/db/drinks/alerts?customer=${customer}&barId=${barId}&count=${count}`)
      .then(({ data }) => {
        if (data > 8) {
          setState(data);
          getCustomer();
        }
      })
      .catch((err) => { console.warn(err); });
  };

  const getCustomer = () => {
    axios.get(`/db/customer/getFriendById?customerId=${customer}`)
      .then(({ data }) => {
        console.log(data);
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setCustomerData(data);
        setNumber(data.phone_number);
      })
      .catch((err) => console.warn(err));
  };

  useEffect(() => {
    grabAlerts();
  }, []);

  if (state) {
    return (
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item container direction="row" justify="center" alignItems="center" className={classes.spacer} />
        <Grid item container direction="row" justify="center" alignItems="center">
          <Grid item container direction="column" justify="center" alignItems="center">
            <Typography variant="subtitle1">
              {`${nameFirst} ${nameLast}`}
            </Typography>
          </Grid>
          <Grid item container direction="column" justify="center" alignItems="center">
            <a href={`tel:+1${number}`}><PhoneIcon /></a>
          </Grid>
        </Grid>
        <Grid item container direction="row" justify="center" alignItems="center">
          {`Drink Count: ${state}`}
        </Grid>
      </Grid>
    );
  }
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item container direction="row" justify="center" alignItems="center">
        <Typography variant="h4">
          All Customer Good
        </Typography>
      </Grid>
    </Grid>
  );
};

export default AlertEntry;
