import React from 'react';
import FriendsMarker from './FriendsMarker.jsx';

const FriendsMarkers = ({ friendLocations }) => (
  friendLocations.length && friendLocations.map((friendsLocation) => (
    <FriendsMarker key={friendLocations.id} friendsLocation={friendsLocation} />
  )));

export default FriendsMarkers;
