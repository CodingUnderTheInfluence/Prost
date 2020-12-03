import React, { useState } from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import warning from '../../../../images/warning.png';

const ReportMarker = ({ report, latitude, longitude, clusterer }) => {
  const [show, setShow] = useState(false);

  return (
    <Marker
      icon={{ url: warning }}
      position={{
        lat: +latitude,
        lng: +longitude,
      }}
      onClick={() => setShow(!show)}
      clusterer={clusterer}
    >
      {show && (
        <InfoWindow>
          <h3>{report}</h3>
        </InfoWindow>
      )}
    </Marker>
  );
};

export default ReportMarker;
