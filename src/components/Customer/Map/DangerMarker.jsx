import React, { useState } from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import warning from '../../../../images/warning.png';

const DangerMarker = ({ danger: { lat, lng } }) => {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <Marker
      position={{ lat, lng }}
      onClick={handleClick}
      icon={{ url: warning }}

    >
      {show &&
        <InfoWindow>
          <input></input>
        </InfoWindow>}
    </Marker>
  );
};
export default DangerMarker;
