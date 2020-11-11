import React from 'react';
import { MarkerClusterer } from '@react-google-maps/api';
import DangerMarker from './DangerMarker.jsx';

const options = {
  imagePath:
    'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
};


const DangerMarkers = ({ dangerMarkers }) => {
  return (
    <MarkerClusterer options={options}>
      {(clusterer) => (
        dangerMarkers.map((danger) => (
          <DangerMarker
            key={danger.time.toISOString()}
            danger={danger}
            clusterer={console.log(clusterer)}
          />
        )))
      }
    </MarkerClusterer>
  );
};

export default DangerMarkers;


