import React, { useState } from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';

const FriendsMarkers = ({ friendLocations }) => {
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState(null);

  const handleClick = () => {
    setShow(!show);

  };

  return (
    <>
      {friendLocations.length && friendLocations.filter(({ isPrivate }) => !isPrivate)
        .map(({ latitude, longitude }, i) => (
          <Marker
            onClick={handleClick}
            key={i}
            position={{
              lat: +latitude,
              lng: +longitude,
            }}
          // icon={{url: '../../../../images/iconmonstr-beer-5.svg'}}
          />
        ))}
      { show && friendLocations.reduce((info, { gId, user_name, latitude, longitude }, i) => {
        if (info === i) {
          return (
            < InfoWindow
              key={gId}
              position={{
                lat: +latitude,
                lng: +longitude,
              }}
            >
              <h5>{user_name}</h5>
            </InfoWindow>
          )
        }
      })}
    </>
  );
};

export default FriendsMarkers;
