import React, { useState } from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
// import { ReportProblem } from '@material-ui/icons';
import warning from '../../../../images/warning.png';

const FriendsMarker = ({ friendsLocation: { user_name, latitude, longitude, report } }) => {
  const [show, setShow] = useState(false);
  const iconSelect = report ? warning : 'http://maps.google.com/mapfiles/ms/icons/blue.png';

  // const iconSelect = () => {
  //   if (report) {
  //     return ReportProblem;
  //   }
  //   return 'http://maps.google.com/mapfiles/ms/icons/blue.png';
  // };

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

export default FriendsMarker;
