import React, { useState } from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import propTypes from 'prop-types';
import user from '../../../../images/user.png';

const FriendsMarker = ({ friendsLocation: { user_name, lat, lng } }) => {
  const [show, setShow] = useState(false);
  // const iconSelect = report ? warning : user;

  const handleClick = () => {
    setShow(!show);
  };
  return (
    <Marker
      key={user_name}
      position={{
        lat: +lat,
        lng: +lng,
      }}
      onClick={() => handleClick()}
      icon={{ url: user }}
    >
      {show && (
        <InfoWindow>
          <h3>{user_name}</h3>
        </InfoWindow>
      )}
    </Marker>
  );
};

FriendsMarker.propTypes = {
  friendsLocation: propTypes.shape({
    user_name: propTypes.string,
    latitude: propTypes.string,
    longitude: propTypes.string,
    report: propTypes.string,
  }),
};

export default FriendsMarker;
