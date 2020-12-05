import React from 'react';
import { MarkerClusterer } from '@react-google-maps/api';
import ReportMarker from './ReportMarker.jsx';

const options = {
  imagePath:
    'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
};

const ReportMarkers = ({ reports }) => (
  <MarkerClusterer
    options={options}
    averageCenter
  >
    {(clusterer) => (
      reports.length && reports.filter((report) => report.report)
        .map(({ id, latitude, longitude, report, createdAt }) => (
          <ReportMarker
            key={id}
            report={report}
            createdAt={createdAt}
            latitude={latitude}
            longitude={longitude}
            clusterer={clusterer}
          />
        ))
    )}
  </MarkerClusterer>
);

export default ReportMarkers;
