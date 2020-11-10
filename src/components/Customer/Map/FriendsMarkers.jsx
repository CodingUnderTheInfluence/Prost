import React from 'react';
import FriendsMarker from './FriendsMarker.jsx';
// TODO:
// import beer from '../../../../images/beer.svg';

const FriendsMarkers = ({ friendLocations }) => {
  return (
    friendLocations.length && friendLocations.map(friendsLocation => (
      <FriendsMarker key={friendLocations.id} friendsLocation={friendsLocation} />
    )));
};

export default FriendsMarkers;
