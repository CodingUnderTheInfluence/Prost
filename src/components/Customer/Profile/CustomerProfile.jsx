import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Home from './Home.jsx';
import EContact from './EContact.jsx';
import Favorite from './Favorite.jsx';
import Translate from './Translate.jsx';
import Checkin from './Checkin.jsx';
import History from './History.jsx';
import Friend from './Friend.jsx';
import CallARide from './CallARide.jsx';
import Settings from './Settings/Settings.jsx';
import EditContact from './Settings/EditContact.jsx';
import EditUsername from './Settings/EditUsername.jsx';

const CustomerProfile = ({ setViewValue, gId }) => {
  const [customerId, setCustomerId] = useState(1);
  const [username, setUsername] = useState('');
  const [view, setView] = useState('Home');
  const [data, setData] = useState({});
  const [friendNumber, setFriendNumber] = useState();
  const getUserName = () => {
    fetch(`/db/customer/gId/${gId}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        setUsername(data.user_name);
        setData(data);
        setCustomerId(data.id);
      })
      .catch((error) => {
        console.warn('Error:', error);
      });
  };

  useEffect(() => {
    getUserName();
  }, []);

  switch (view) {
    case 'Home':
      return (
        <Home
          setView={setView}
          setUsername={setUsername}
          name={username}
          setViewValue={setViewValue}
          img={data.profile_image}
          gId={gId}
        />
      );
    case 'EContact':
      return (
        <EContact
          setView={setView}
          customerId={customerId}
          setFriendNumber={setFriendNumber}
        />
      );
    case 'Checkin':
      return (
        <Checkin
          setView={setView}
          customerId={customerId}
        />
      );
    case 'History':
      return (
        <History
          setView={setView}
          customerId={customerId}
        />
      );
    case 'Favorite':
      return (
        <Favorite
          setView={setView}
          customerId={customerId}
        />
      );
    case 'Translate':
      return (
        <Translate
          setView={setView}
          customerId={customerId}
        />
      );
    case 'Friend':
      return (
        <Friend
          setView={setView}
          customerId={customerId}
        />
      );
    case 'Ride':
      return (
        <CallARide
          setView={setView}
          customerId={customerId}
          friendNumber={friendNumber}
        />
      );
    case 'Settings':
      return (
        <Settings
          setView={setView}
          customerId={customerId}
        />
      );
    case 'EditContact':
      return <EditContact />;
    case 'EditUsername':
      return <EditUsername customerId={customerId} setView={setView} />;
  }
};

export default CustomerProfile;
