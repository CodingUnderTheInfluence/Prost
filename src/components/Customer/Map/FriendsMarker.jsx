import React, { useState } from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';

const FriendsMarker = ({ friendsLocation: { user_name, latitude, longitude } }) => {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };
  return (
    <Marker
      position={{
        lat: +latitude,
        lng: +longitude,
      }}
      onClick={() => handleClick()}
      icon={{ url: 'http://maps.google.com/mapfiles/ms/icons/blue.png' }}
    >
      {show && (
        <InfoWindow>
          <h3>{user_name}</h3>
        </InfoWindow>
      )}
    </Marker>
  );
};

export default FriendsMarker;
