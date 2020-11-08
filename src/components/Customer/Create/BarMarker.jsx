import React, { useState } from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';

const BarMarker = ({ party: { bar_name, id, latitude, longitude } }) => {

  const [show, setShow] = useState(false);

  const handleClick = (id) => {
    setShow(id);
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
