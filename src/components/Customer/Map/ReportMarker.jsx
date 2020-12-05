import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Marker, InfoWindow } from '@react-google-maps/api';
import warning from '../../../../images/warning.png';

const formatDate = (dateString) => {
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const ReportMarker = ({ report, createdAt, latitude, longitude, clusterer }) => {
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
          <div>
            <h3>{report}</h3>
            <h5>{formatDate(createdAt)}</h5>
          </div>
        </InfoWindow>
      )}
    </Marker>
  );
};

ReportMarker.propTypes = {
  report: propTypes.string.isRequired,
  createdAt: propTypes.string.isRequired,
  latitude: propTypes.string.isRequired,
  longitude: propTypes.string.isRequired,
  clusterer: propTypes.string.isRequired,
};

export default ReportMarker;
