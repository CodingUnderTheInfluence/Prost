import React from 'react';
import { Marker } from '@react-google-maps/api';

const FriendsMarkers = ({ friendLocations }) => {
  return (
    friendLocations ? friendLocations.filter(({ isPrivate }) => !isPrivate)
      .map(({ latitude, longitude, gId }) => (
        <Marker
          key={gId}
          position={{
            lat: +latitude,
            lng: +longitude,
          }}
        // icon={{url: '../../../../images/iconmonstr-beer-5.svg'}}
        />
      ))
      : null
  );
};

export default FriendsMarkers;
