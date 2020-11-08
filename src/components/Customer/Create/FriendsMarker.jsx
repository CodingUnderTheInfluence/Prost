import React, { useState } from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';

const FriendsMarker = ({ friendsLocation: { id, user_name, latitude, longitude } }) => {
  const [show, setShow] = useState(false);

  const handleClick = (id) => {
    setShow(id);
  };
  return (
    <Marker
      key={id}
      position={{
        lat: +latitude,
        lng: +longitude,
      }}
      onClick={() => handleClick(id)}
      icon={{ url: 'http://maps.google.com/mapfiles/ms/icons/blue.png' }}
    >
      {show &&
        <InfoWindow>
          <div>{user_name}</div>
        </InfoWindow>}
    </Marker>
  );
};

export default FriendsMarker;
