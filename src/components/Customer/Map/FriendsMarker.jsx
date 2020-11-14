import React, { useState } from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import PropTypes from 'prop-types';
// import { ReportProblem } from '@material-ui/icons';
import warning from '../../../../images/warning.png';
import user from '../../../../images/user.png';

const FriendsMarker = ({ friendsLocation: { user_name, latitude, longitude, report } }) => {
  const [show, setShow] = useState(false);
  const iconSelect = report ? warning : user;

  console.log('icon select', iconSelect);
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
      icon={{ url: iconSelect }}
    >
      {show && (
        <InfoWindow>
          {report ? (
            <h3>{report}</h3>
          )
            : (
              <h3>{user_name}</h3>
            )}
        </InfoWindow>
      )}
    </Marker>
  );
};

FriendsMarker.PropTypes = {
  friendsLocation: PropTypes.shape({
    user_name: PropTypes.string,
    latitude: PropTypes.string,
    longitude: PropTypes.string,
    report: PropTypes.string,
  }),
};

export default FriendsMarker;
