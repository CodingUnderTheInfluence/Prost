import React, { useState } from 'react';
import {
  Grid, Button, Typography, makeStyles,
} from '@material-ui/core';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    borderRadius: '10px',
  },
  button: {
    variant: 'contained',
    color: 'primary',
    padding: '5px',
    margin: '10px 0 10px 0',
    width: '200px',
  },
  backBtn: {
    opacity: '60%',
  },
});

const CallARide = ({ friendNumber, setView }) => {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Grid
        item
        direction="row"
        justify="center"
        alignItems="center"
        column="center"
        className={classes.row}
      >
        <Typography variant="subtitle1">
          Get a Ride!
        </Typography>
      </Grid>
      <Grid
        item
        direction="row"
        justify="center"
        alignItems="center"
        column="center"
        className={classes.row}
      >
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          href="https://www.uber.com/us/en/ride/"
          target="_blank"
        >
          Uber
        </Button>
      </Grid>
      <Grid
        item
        direction="row"
        justify="center"
        alignItems="center"
        column="center"
        className={classes.row}
      >
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          href="https://ride.lyft.com/"
          target="_blank"
        >
          Lyft
        </Button>
      </Grid>
      <Grid
        item
        direction="row"
        justify="center"
        alignItems="center"
        column="center"
        className={classes.row}
      >
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          href={`tel:+1${friendNumber}`}
        >
          Friend
        </Button>
      </Grid>
      <Button
        size="small"
        color="primary"
        className={classes.backBtn}
        onClick={() => setView('Home')}
      >
        Back
      </Button>
    </Grid>
  );
};

export default CallARide;
