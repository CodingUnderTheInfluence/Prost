import React from 'react';
import { Marker } from '@react-google-maps/api';

const BarMarkers = ({ parties }) => {

  const handleClick = (e) => {
    // setInfo({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    // setShow(!show);
  };
  return (
    <div>
      {parties.length && parties.map(({ latitude, longitude }) => {
        return (

          <Marker
            onClick={handleClick}
            position={{
              lat: +latitude,
              lng: +longitude,
            }}
          >
          </Marker>
        )
      })}
    </div >
  );
}

export default BarMarkers;
