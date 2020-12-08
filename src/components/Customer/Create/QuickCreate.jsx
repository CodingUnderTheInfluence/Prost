import React from 'react';
import '../../../styles/styles.css';
import Fab from '@material-ui/core/Fab';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  create: {
    position: 'fixed',
    margin: 'auto',
    right: '20px',
    top: '80%',
    left: '85%',
  },
});

const QuickCreate = ({ getMyLocation, panTo }) => {
  const classes = useStyles();

  const success = (pos) => {
    const { latitude, longitude } = pos.coords;
    getMyLocation({ lat: latitude, lng: longitude });
    panTo({ lat: latitude, lng: longitude, key: 'user' });
  };

  const error = () => null;

  const handleClick = () => {
    navigator.geolocation.getCurrentPosition(success, error);
  };

  return (
    <Fab
      className={classes.create}
      size="small"
      color="primary"
      onClick={handleClick}
    >
      <MyLocationIcon />
    </Fab>
    // </div>
  );
};

export default QuickCreate;
