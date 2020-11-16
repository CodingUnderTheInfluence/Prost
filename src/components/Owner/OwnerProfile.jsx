import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Button,
  makeStyles,
} from '@material-ui/core';
import Logout from '../Logout.jsx';
import Dialogs from './Dialogs.jsx';

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
  count,
  image,
  barName,
  barAddress,
  barNumber,
  capacity,
}) => {
  const classes = useStyles();
  /*
        This opens info Dialog
    */
  const [openInfo, setOpenInfo] = useState(false);
  const handleClickOpenInfo = () => {
    setOpenInfo(true);
  };
  const handleCloseInfo = () => {
    setOpenInfo(false);
  };
    /*
        This opens Occupency Dialog
    */
  const [openOcc, setOpenOcc] = useState(false);
  const handleClickOpenOcc = () => {
    setOpenOcc(true);
  };
  const handleCloseOcc = () => {
    setOpenOcc(false);
  };
    /*
        This opens normal Dialog
    */
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const covidCap = (capacity * 0.25);
  const covidCapLow = covidCap * 0.25;
  const covidCapHigh = covidCap * 0.75;
  const occupencyStatus = () => {
    if (count < covidCapLow) {
      return (
        <Grid
          tem
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.green}
        >
          Empty
        </Grid>
      );
    } if (covidCapLow <= count && count < covidCapHigh) {
      return (
        <Grid
          item
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.yellow}
        >
          Medium
        </Grid>
      );
    } if (covidCapHigh <= count && count < covidCap) {
      return (
        <Grid
          item
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.red}
        >
          Full
        </Grid>
      );
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
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpenInfo}
        className={classes.button}
      >
        My Information
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpenOcc}
        className={classes.button}
      >
        Current Occupency
      </Button>
      <Logout className={classes.logout} />
      <Dialogs
        occupencyStatus={occupencyStatus}
        barAddress={barAddress}
        barNumber={barNumber}
        barName={barName}
        capacity={capacity}
        handleClickOpen={handleClickOpen}
        handleClickOpenInfo={handleClickOpenInfo}
        handleClickOpenOcc={handleClickOpenOcc}
        handleCloseInfo={handleCloseInfo}
        handleCloseOcc={handleCloseOcc}
        handleClose={handleClose}
        openInfo={openInfo}
        openOcc={openOcc}
        open={open}
        count={count}
      />
    </Grid>
  );
};

export default OwnerProfile;
