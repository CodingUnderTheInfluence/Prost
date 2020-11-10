import React from 'react';
import BarMarker from './BarMarker.jsx';

const BarMarkers = ({ parties }) => {
  return (
    parties.length && parties.map(party => (
      <BarMarker key={party.id} party={party} />
    ))
  );
};

export default BarMarkers;
