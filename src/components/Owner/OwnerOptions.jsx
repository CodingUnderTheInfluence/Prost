import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Button,
  makeStyles,
} from '@material-ui/core';
import { getMenu } from '../../helpers/menu';
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

const OwnerOptions = ({
  count,
  barId,
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
          This opens Menu Dialog
      */
  const [openMenu, setOpenMenu] = useState(false);
  const [loadedMenu, setLoadedMenu] = useState([]);
  const handleClickOpenMenu = () => {
    setOpenMenu(true);
  };
  const handleCloseMenu = () => {
    setOpenMenu(false);
  };
  const reload = (id, url) => {
    getMenu(id, url)
      .then(([results]) => {
        if (results.info) {
          const arr = JSON.parse(results.info);
          setLoadedMenu(arr);
        } else {
          setLoadedMenu(null);
        }
      })
      .catch((err) => {
        console.warn(err);
      });
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
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpenMenu}
        className={classes.button}
      >
        Menu
      </Button>
      <div className={classes.logout}>
        <Logout />
      </div>
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
        openMenu={openMenu}
        loadedMenu={loadedMenu}
        reload={reload}
        handleClickOpenMenu={handleClickOpenMenu}
        handleCloseMenu={handleCloseMenu}
        barId={barId}
      />
    </Grid>
  );
};

export default OwnerOptions;
