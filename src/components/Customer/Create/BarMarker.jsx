import React, { useState } from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import barCapacity from '../../../helpers/barCapacity';
const BarMarker = ({ party: { bar_name, id, latitude, longitude } }) => {
  const [show, setShow] = useState(false);
  const [getBarCapacity, setBarCapacity] = useState(0);


  const handleClick = (id) => {
    setShow(id);
    console.log(barCapacity(id))
  };

  return (
    <Marker
      key={id}
      position={{
        lat: +latitude,
        lng: +longitude,
      }}
      onClick={() => handleClick(id)}
    >
      {show &&
        <InfoWindow>
          <div>{bar_name}</div>
        </InfoWindow>}
    </Marker >
  )
}

export default BarMarker;
