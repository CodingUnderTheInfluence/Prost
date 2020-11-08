import React from 'react';
import BarMarker from './BarMarker.jsx';

const BarMarkers = ({ parties }) => {
  return (
    parties.length && parties.map(party => (
      <BarMarker party={party} />
    ))
  );
};

export default BarMarkers;
