import React, { useState } from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';

const FriendsMarkers = ({ friendLocations }) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [info, setInfo] = useState(null);

  const handleClick = (e) => {
    setInfo({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    setShow(!show);
  };
  return (
    <div>
      {friendLocations.length && friendLocations.filter(({ isPrivate }) => !isPrivate)
        .map(({ latitude, longitude, user_name }, i) => (
          <Marker
            onClick={handleClick}
            key={i}
            position={{
              lat: +latitude,
              lng: +longitude,
            }}
          // icon={{ url: '../../../../images/iconmonstr-beer-5.svg' }}
          >
            {/* TODO: */}
          </Marker>
        ))
      }
      {
        show && <InfoWindow
          position={info}
        >
          <div>{name}</div>
        </InfoWindow>
      }
    </div >
  );
};

export default FriendsMarkers;
