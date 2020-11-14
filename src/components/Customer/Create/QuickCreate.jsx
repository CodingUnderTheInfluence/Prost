import React from 'react';
import Fab from '@material-ui/core/Fab';
import MyLocationIcon from '@material-ui/icons/MyLocation';

const QuickCreate = ({ getMyLocation, panTo }) => {
  const success = (pos) => {
    const { latitude, longitude } = pos.coords;
    getMyLocation({ latitude, longitude });
    panTo({ lat: latitude, lng: longitude, key: 'user' });
  };

  const error = () => null;

  const handleClick = () => {
    navigator.geolocation.getCurrentPosition(success, error);
  };

  return (
    // <div style={{
    //   justifyContent: 'center',
    //   alignItems: 'center',
    // }}
    // >
    <Fab
      color="primary"
      onClick={handleClick}
    >
      <MyLocationIcon />
    </Fab>
    // </div>
  );
};

export default QuickCreate;
