import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
} from '@material-ui/core';
import Logout from '../Logout.jsx';
import Dialogs from './Dialogs.jsx';

const OwnerProfile = ({
  setViewValue,
  count,
  image,
  barName,
  barAddress,
  barNumber,
  capacity,
}) => {
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
        <div>
          green
        </div>
      );
    } if (covidCapLow <= count && count < covidCapHigh) {
      return (
        <div>
          yellow
        </div>
      );
    } if (covidCapHigh <= count && count < covidCap) {
      return (
        <div>
          red
        </div>
      );
    }
  };

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item container direction="row" justify="center" alignItems="center">
        <img src={image} style={{ height: '100px', width: '100px' }} />
      </Grid>
      <Grid item container direction="row" justify="center" alignItems="center">
        <Typography variant="subtitle1">
          @
          {barName}
        </Typography>
      </Grid>
      <Button variant="outlined" color="primary" onClick={handleClickOpenInfo}>
        My Information
      </Button>
      <Button variant="outlined" color="primary" onClick={handleClickOpenOcc}>
        Current Occupency
      </Button>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Call emergency Contact
      </Button>
      <Logout setViewValue={setViewValue} />
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
