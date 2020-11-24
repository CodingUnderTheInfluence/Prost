import React, { useState } from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import propTypes from 'prop-types';
import user from '../../../../images/user.png';
import me from '../../../../images/me.png';

const FriendsMarker = ({ friendsLocation }) => {
  const [show, setShow] = useState(false);
  const { user_name, id_google, lat, lng } = friendsLocation;

  const iconSelect = id_google === localStorage.gId ? me : user;

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
      icon={{ url: iconSelect }}
    >
      {show && (
        <InfoWindow>
          <div>
            <h3>{user_name}</h3>
          </div>
        </InfoWindow>
      )}
    </Marker>
  );
};

FriendsMarker.propTypes = {
  friendsLocation: propTypes.shape({
    user_name: propTypes.string,
    id_google: propTypes.number,
    lat: propTypes.string,
    lng: propTypes.string,
    report: propTypes.string,
  }),
};

export default FriendsMarker;
