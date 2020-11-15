import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  Grid, Typography, Button, makeStyles,
} from '@material-ui/core';
import Logout from '../../Logout.jsx';

const useStyles = makeStyles(() => ({
  image: {
    height: '100px',
    width: '100px',
  },
}));

const Home = ({
  setView,
  name,
  setViewValue,
  img,
}) => {
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
        container
        direction="row"
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
          <img
            src={img || 'https://i.imgur.com/jRnsxbB.png'}
            className={classes.image}
          />
        </Grid>
        <Grid
          item
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          @
          {name}
        </Grid>
      </Grid>
      <Grid
        item
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
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setView('Checkin')}
          >
            Check in
          </Button>
        </Grid>
        <Grid
          item
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setView('EContact')}
          >
            Emergency Contact
          </Button>
        </Grid>
        <Grid
          item
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setView('Translate')}
          >
            Translate
          </Button>
        </Grid>
        <Grid
          item
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid
            item
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setView('Friend')}
            >
              Friend's List
            </Button>
          </Grid>
          <Grid
            item
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setView('Ride')}
            >
              Call a Ride
            </Button>
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid
            item
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setView('History')}
            >
              History
            </Button>
          </Grid>
          <Grid
            item
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setView('Favorite')}
            >
              Favorite Spots
            </Button>
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="row"
          justify="center"
          alignItems="center"
        />
      </Grid>
    </Grid>
  );
};

export default Home;
