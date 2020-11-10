import React from 'react'
import { Marker } from '@react-google-maps/api';

const DangerMarkers = ({ dangerMarkers }) => {
  console.log(dangerMarkers);
  return (
    <div>
      {
        dangerMarkers.map(({ lat, lng, time }) => (
          <Marker
            key={time.toISOString()}
            position={{ lat, lng }}
          >

          </Marker>
        ))
      }

    </div>
  )
}

export default DangerMarkers;


