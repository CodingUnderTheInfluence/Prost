import React, { useState } from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
// TODO:
// import beer from '../../../../images/beer.svg';

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
        .map(({ latitude, longitude, user_name }) => (
          <Marker
            onClick={handleClick}
            key={user_name}
            position={{
              lat: +latitude,
              lng: +longitude,
            }}
            // {/* TODO: */}
            icon={{ url: 'http://maps.google.com/mapfiles/ms/icons/blue.png' }}
          >
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
