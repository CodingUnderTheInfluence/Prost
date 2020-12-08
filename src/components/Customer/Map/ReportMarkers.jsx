import React from 'react';
import ReportMarker from './ReportMarker.jsx';

const ReportMarkers = ({ reports }) => (
  reports.length && reports.filter((report) => report.report)
    .map(({ id, latitude, longitude, report }) => (
      <ReportMarker
        key={id}
        report={report}
        latitude={latitude}
        longitude={longitude}
      />
    ))
);

export default ReportMarkers;
