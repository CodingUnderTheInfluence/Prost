import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import MyLocationIcon from '@material-ui/icons/MyLocation';



const QuickCreate = ({getMyLocation, panTo}) => {

const success = (pos) => {
  const { latitude, longitude } = pos.coords;
  getMyLocation({ latitude, longitude });
  panTo({lat: latitude, lng: longitude})
}

const error = (err) => {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

const handleClick = () => {
  navigator.geolocation.getCurrentPosition(success, error);
};


  return (
    <Fab 
      variant="extended"
      onClick={handleClick}
    ><MyLocationIcon  />
      I'm drinking!
    </Fab >
  );
};

export default QuickCreate;