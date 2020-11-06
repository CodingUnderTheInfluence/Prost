import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import MyLocationIcon from '@material-ui/icons/MyLocation';


// add to party db and customer party db

const QuickCreate = ({ getMyLocation, panTo }) => {

  const success = (pos) => {
    const { latitude, longitude } = pos.coords;
    console.info(pos.coords);
    getMyLocation({ latitude, longitude });
    panTo({ lat: latitude, lng: longitude })
  }

  const error = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  const handleClick = () => {
    navigator.geolocation.getCurrentPosition(success, error);
  };


  return (
    <div style={{
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Fab
        color='primary'
        onClick={handleClick}
      ><MyLocationIcon />
      </Fab >
    </div>
  );
};

export default QuickCreate;