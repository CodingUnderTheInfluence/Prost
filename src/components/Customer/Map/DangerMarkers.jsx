import React from 'react'
import { Marker, InfoWindow } from '@react-google-maps/api';
import warning from '../../../../images/warning.png';
// import { MdPriorityHigh } from "react-icons/md";


const DangerMarkers = ({ dangerMarkers }) => {
  return (
    <div>
      {dangerMarkers.map(({ lat, lng, time }) => (
        <Marker
          key={time.toISOString()}
          position={{ lat, lng }}
          icon={{ url: warning }}
        >
        </Marker>
      ))
      }

    </div>
  )
}

export default DangerMarkers;


