import React, { useState } from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';

const FriendsMarkers = ({ friendLocations }) => {
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState(null);

  // const handleClick = () => {
  //   setShow(!show);

  // };

  return (
    <>
      {friendLocations.length && friendLocations.filter(({ isPrivate }) => !isPrivate)
        .map(({ latitude, longitude, user_name }, i) => (
          <Marker
            // onClick={handleClick}
            key={i}
            position={{
              lat: +latitude,
              lng: +longitude,
            }}
          // icon={{url: '../../../../images/iconmonstr-beer-5.svg'}}
          >
            {/* <InfoWindow><div>{user_name}</div></InfoWindow> */}
          </Marker>
        ))}
    </>
  );
};

export default FriendsMarkers;
