import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import LandingPage from './components/LandingPage.jsx';
import CustomerView from './components/Customer/CustomerView.jsx';
import OwnerView from './components/Owner/OwnerView.jsx';

const App = () => {
  const [value, setViewValue] = useState('');
  const [gId, setId] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [username, setUsername] = useState('');
  const [gEmail, setGEmail] = useState('');
  const [mapLatLng, setMapLatLng] = useState('');
  const [userId, setUserId] = useState('');
  const [barId, setBarId] = useState();
  const handleChange = (event, newValue) => {
    setViewValue(newValue);
  };

  useEffect(() => {
    if (localStorage.customerToken) {
      handleChange(null, 'CustomerView');
    } else if (localStorage.ownerToken) {
      handleChange(null, 'OwnerView');
    } else {
      handleChange(null, 'Landing');
    }
  }, []);

  if (value === 'Landing') {
    return (
      <LandingPage
        setViewValue={setViewValue}
        setId={setId}
        setProfileImage={setProfileImage}
        setUsername={setUsername}
        gId={gId}
        username={username}
        profileImage={profileImage}
        setGEmail={setGEmail}
        gEmail={gEmail}
        mapLatLng={mapLatLng}
        setBarId={setBarId}
      />
    );
  } if (value === 'CustomerView') {
    return (
      <CustomerView
        setViewValue={setViewValue}
        gId={gId}
        username={username}
        userId={userId}
        setMapLatLng={setMapLatLng}
        setId={setId}
        setUsername={setUsername}
      />
    );
  } if (value === 'OwnerView') {
    return <OwnerView setViewValue={setViewValue} barId={barId} />;
  }
  return <LandingPage setViewValue={setViewValue} />;
}
export default App;
