import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import LandingPage from './components/LandingPage.jsx';
import CustomerView from './components/Customer/CustomerView.jsx';
import OwnerView from './components/Owner/OwnerView.jsx';
import Form from './components/Form/Form.jsx'

function App() {

  const [value, setViewValue] = useState('');
  const [gId, setId] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [username, setUsername] = useState('');
  const [mapLatLng, setMapLatLng] = useState('');
  const [userId, setUserId] = useState('');
  const handleChange = (event, newValue) => {
    setViewValue(newValue);
  };

  useEffect(() => {
    if (localStorage.customerToken) {
      handleChange(null, 'CustomerView')
    } else if (localStorage.ownerToken) {
      handleChange(null, 'OwnerView')
    } else {
      handleChange(null, 'Landing')
    }
  }, [])

  if (value === 'Landing') {
    return <LandingPage setViewValue={setViewValue} setUserId={setUserId} setId={setId} setProfileImage={setProfileImage} setUsername={setUsername} />
  } else if (value === 'CustomerView') {
    return <CustomerView setViewValue={setViewValue} gId={gId} username={username} userId={userId} setMapLatLng={setMapLatLng} setId={setId} setUsername={setUsername} />
  } else if (value === 'OwnerView') {
    return <OwnerView setViewValue={setViewValue} />
  } else if (value === 'form') {
    return <Form setViewValue={setViewValue} gId={gId} profileImage={profileImage} username={username} />
  } else {
    return <LandingPage setViewValue={setViewValue} />
  }
}

export default App
