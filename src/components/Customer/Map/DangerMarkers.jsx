import React from 'react';
import DangerMarker from './DangerMarker.jsx';

const DangerMarkers = ({ dangerMarkers }) => {
  return (
    dangerMarkers.length && dangerMarkers.map((danger) => (
      <DangerMarker
        key={danger.time.toISOString()}
        danger={danger}
      />
    ))
  );
};

export default DangerMarkers;


