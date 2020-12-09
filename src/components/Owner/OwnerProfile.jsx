import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Button,
  makeStyles,
} from '@material-ui/core';
import axios from 'axios';
import OwnerOptions from './OwnerOptions.jsx';

const useStyles = makeStyles(() => ({
  image: {
    height: '100px',
    width: '100px',
    borderRadius: '50px',
    opacity: '85%',
  },
  green: {
    color: 'green',
    fontSize: '18pt',
  },
  red: {
    color: 'red',
    fontSize: '18pt',
  },
  yellow: {
    color: 'yellow',
    fontSize: '18pt',
  },
  button: {
    width: '250px',
    margin: '5px 0 0 0',
    opacity: '98%',
  },
  logout: {
    margin: '5px 0 0 0 ',
  },
}));

const OwnerProfile = ({
  barId,
}) => {
  const classes = useStyles();
  const [count, setCount] = useState();
  const [barAddress, setBarAddress] = useState('');
  const [barNumber, setBarNumber] = useState('');
  const [barName, setBarName] = useState('');
  const [image, setImage] = useState('');
  const [capacity, setCapacity] = useState('');

  const barInfo = () => {
    axios.get(`/db/bar/info?id=${barId}`)
      .then(({ data }) => {
        setImage(data[0].profile_image);
        setBarName(data[0].bar_name);
        setBarAddress(data[0].address);
        setBarNumber(data[0].phone_number);
        setCapacity(data[0].bar_capacity);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const getInfo = () => {
    barInfo();
  };
  const fetchCustomers = () => {
    axios.get(`/db/cb/list?barId=${barId}`)
      .then(({ data }) => {
        setCount(data.length);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  useEffect(() => {
    fetchCustomers();
    getInfo();
  }, []);

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <img src={image} alt="profile" className={classes.image} />
      </Grid>
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Typography variant="subtitle1">
          @
          {barName}
        </Typography>
      </Grid>
      <Grid item container direction="row" justify="center" alignItems="center">
        <OwnerOptions
          count={count}
          image={image}
          barName={barName}
          barAddress={barAddress}
          barNumber={barNumber}
          capacity={capacity}
        />
      </Grid>
    </Grid>
  );
};

export default OwnerProfile;
