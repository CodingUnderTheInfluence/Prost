import React from 'react';
import propTypes from 'prop-types';
import { MarkerClusterer } from '@react-google-maps/api';
import DangerMarker from './DangerMarker.jsx';

const DangerMarkers = ({ dangerMarkers, getDblClickDangerMarker }) => (
  dangerMarkers.map((danger) => (
    <DangerMarker
      key={danger.time.toISOString()}
      danger={danger}
      allDanger={dangerMarkers}
      getDblClickDangerMarker={getDblClickDangerMarker}
    />
  ))
);

DangerMarkers.propTypes = {
  dangerMarkers: propTypes.arrayOf(propTypes.any),
  getDblClickDangerMarker: propTypes.func,
};

export default DangerMarkers;
