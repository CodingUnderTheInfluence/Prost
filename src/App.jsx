import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';

import CustomerView from './components/Customer/CustomerView.jsx';
import LandingPage from './components/LandingPage.jsx';
import Create from './components/Customer/Create.jsx';
import MapContainer from './components/Customer/Map2.jsx';

// import MapContainer from './components/Map.jsx';
// import MapContainer from './components/Customer/Map.jsx';
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
      <MapContainer />
      <CustomerView />
      <OwnerView />
    </>
  );
};

export default App;