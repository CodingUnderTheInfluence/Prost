import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';

import Home from './components/Home.jsx';
import LandingPage from './components/LandingPage.jsx';
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
            <Link to='/home'>Home</Link>
          </li>
        </ul>

        <Switch>
          <Route exact path='/' component={LandingPage}>
            <LandingPage />
          </Route>
          <Route path='/home'>
            <Home />
          </Route>
        </Switch>
      </Router>
      <Create />
      <MapContainer />
      <OwnerView />
    </>
  );
};

export default App;