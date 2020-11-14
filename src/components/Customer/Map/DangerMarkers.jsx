import React from 'react';
import propTypes from 'prop-types';
import { MarkerClusterer } from '@react-google-maps/api';
import DangerMarker from './DangerMarker.jsx';

const options = {
  imagePath:
    'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
};

const DangerMarkers = ({ dangerMarkers, getDblClickDangerMarker }) => (
  <MarkerClusterer options={options}>
    {() => (
      dangerMarkers.map((danger) => (
        <DangerMarker
          key={danger.time.toISOString()}
          danger={danger}
          allDanger={dangerMarkers}
          getDblClickDangerMarker={getDblClickDangerMarker}
        />
      )))}
  </MarkerClusterer>
);

DangerMarkers.propTypes = {
  dangerMarkers: propTypes.arrayOf(propTypes.any),
  getDblClickDangerMarker: propTypes.func,
};

export default DangerMarkers;
