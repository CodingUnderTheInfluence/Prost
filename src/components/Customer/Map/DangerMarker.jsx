import React from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import warning from '../../../../images/warning.png';

const DangerMarker = ({ danger: { lat, lng } }) => (
  <Marker
    position={{ lat, lng }}
    icon={{ url: warning }}
  >
    <InfoWindow>
      <input></input>
    </InfoWindow>
  </Marker>
);

export default DangerMarker;
