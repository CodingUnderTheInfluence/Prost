import React from 'react';
import PropTypes from 'prop-types';
import { MarkerClusterer } from '@react-google-maps/api';
import DangerMarker from './DangerMarker.jsx';

const options = {
  imagePath:
    'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
};

const DangerMarkers = ({ dangerMarkers }) => (
  <MarkerClusterer options={options}>
    {(clusterer) => (
      dangerMarkers.map((danger) => (
        <DangerMarker
          key={danger.time.toISOString()}
          danger={danger}
          clusterer={console.log(clusterer)}
        />
      )))}
  </MarkerClusterer>
);

DangerMarkers.PropTypes = {
  dangerMarkers: PropTypes.arrayOf(PropTypes.any),
};

export default DangerMarkers;
