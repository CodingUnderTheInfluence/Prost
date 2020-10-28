import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import LandingPage from './components/LandingPage.jsx';
import Create from './components/Customer/Create.jsx';
import MapContainer from './components/Customer/Map2.jsx';

// import MapContainer from './components/Map.jsx';
// import MapContainer from './components/Customer/Map.jsx';
import OwnerView from './components/Owner/OwnerView.jsx'
import TestBtn from './components/Customer/testButton.jsx';


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
            <Link to='/home'>CustomerView</Link>
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
      <TestBtn />
      <MapContainer />
      <CustomerView />
      {/* <OwnerView /> */}
    </>
  );
};

export default App;
