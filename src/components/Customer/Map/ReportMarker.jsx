import React, { useState } from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import warning from '../../../../images/warning.png';

const ReportMarker = ({ report, createdAt, latitude, longitude, clusterer }) => {
  const [show, setShow] = useState(false);

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options)
  };

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
          <div>
            <h3>{report}</h3>
            <h5>{formatDate(createdAt)}</h5>
          </div>
        </InfoWindow>
      )}
    </Marker>
  );
};

export default ReportMarker;
