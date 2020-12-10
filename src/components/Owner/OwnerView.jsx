import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  BottomNavigation,
  BottomNavigationAction,
  Grid,
  Typography,
} from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import TocOutlinedIcon from '@material-ui/icons/TocOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import WarningIcon from '@material-ui/icons/Warning';
import axios from 'axios';
import BarList from './BarCustomerList.jsx';
import OwnerProfile from './OwnerProfile.jsx';
import Alerts from './Alerts.jsx';

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    borderRadius: '10px',
  },
  stickToBottom: {
    width: '100vw',
    position: 'fixed',
    bottom: '0',
    marginLeft: 'auto',
    marginRight: 'auto',
    border: 'solid #0365b0 1px',
  },
});

const OwnerView = ({ barId }) => {
  const classes = useStyles();
  const [value, setValue] = useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderView = () => {
    if (value === 0) {
      return (
        <BarList barId={barId} />
      );
    }
    if (value === 1) {
      return <Alerts barId={barId} />;
    }
    if (value === 2) {
      return (
        <OwnerProfile barId={barId} />
      );
    }
    return (
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item container direction="row" justify="center" alignItems="center">
          <Typography variant="subtitle1">
            Welcome to your Owner Profile!
          </Typography>
        </Grid>
        <Grid item container direction="row" justify="center" alignItems="center">
          <Typography variant="subtitle2">
            Here you will find helpful information regarding your bar.
          </Typography>
        </Grid>
      </Grid>
    );
  };
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item container direction="row" justify="center" alignItems="center">
        {renderView()}
      </Grid>
      <Grid item container direction="row" justify="center" alignItems="center">
        <BottomNavigation
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          className={classes.stickToBottom}
        >
          <BottomNavigationAction icon={<TocOutlinedIcon />} label="Customers" />
          <BottomNavigationAction icon={<WarningIcon />} label="Alerts" />
          <BottomNavigationAction icon={<AccountCircleOutlinedIcon />} label="Profile" />
        </BottomNavigation>
      </Grid>
    </Grid>
  );
};
export default OwnerView;
