import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  Grid, Typography, Button, Snackbar, makeStyles,
} from '@material-ui/core';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const HistoryList = ({ list, customerId }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const addFavorite = async () => {
    try {
      const obj = {
        id_bar: list.id,
        id_customer: customerId,
      };
      const result = await fetch('/db/cb/add/favorite', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      });
      handleClick();
    } catch (err) {
      console.warn(err);
    }
  };

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
          <Typography variant="subtitle1">
            {list.bar_name}
          </Typography>
        </Grid>
        <Grid
          item
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Typography variant="subtitle1">
            {list.address}
          </Typography>
        </Grid>
        <Grid
          item
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Typography variant="subtitle1">
            {list.phone_number}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        item
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={addFavorite}
        >
          <StarBorderIcon />
        </Button>
      </Grid>
      <div className={classes.root}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Favorite Added!
          </Alert>
        </Snackbar>
      </div>
    </Grid>
  );
};

export default HistoryList;
