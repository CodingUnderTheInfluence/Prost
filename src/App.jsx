import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import LandingPage from './components/LandingPage.jsx';
<<<<<<< HEAD
import CustomerView from './components/Customer/CustomerView.jsx';
import OwnerView from './components/Owner/OwnerView.jsx';
import Form from './components/Form/Form.jsx';

function App() {
  const [value, setViewValue] = useState('');
  const [gId, setId] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [username, setUsername] = useState('');
  const [gEmail, setGEmail] = useState('');
  const [mapLatLng, setMapLatLng] = useState('');
  const [userId, setUserId] = useState('');
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
    return <OwnerView setViewValue={setViewValue} />;
  } if (value === 'form') {
    return (
      <Form
        setViewValue={setViewValue}
        gId={gId}
        profileImage={profileImage}
        username={username}
      />
    );
  }
  return <LandingPage setViewValue={setViewValue} />;
}
=======
import Create from './components/Create.jsx';
import MapContainer from './components/Map.jsx';
import OwnerView from './components/Owner/OwnerView.jsx'

const App = () => {
  return (
    <>
      <h1>Welcome from App!</h1>
      <Router>
        <ul>
          <li>
            <Link to='/'>Sign in</Link>
          </li>
          <li>
<<<<<<< HEAD
            <Link to='/home'>CustomerView</Link>
=======
            <Link to='/home'>Home</Link>
>>>>>>> 001f8ef... (add) all files to my forkl
          </li>
        </ul>

      <Switch>
        <Route exact path='/' component={LandingPage}>
          <LandingPage />
        </Route>
        <Route path='/home'>
          <CustomerView />
        </Route>
      </Switch>
    </Router>
    <MapContainer />
    <OwnerView />
    </>
  );
};
>>>>>>> 0753b79... (add) all files to my forkl

export default App;
