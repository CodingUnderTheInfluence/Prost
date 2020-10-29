import React, { useEffect } from 'react';
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
import Login from './components/Login.jsx';
import Logout from './components/Logout.jsx';


const App = () => {

  // THIS GETS ALL USER INFO 
  // const arr = [];
  // useEffect(() => {
  //   Axios.get('/db/customer')
  //     .then(({ data }) => {
  //       data.forEach(customer => {
  //         arr.push({ firstName: customer.first_name, lastName: customer.last_name, userName: customer.user_name })
  //       })
  //       console.log(arr, 'ARRAY');
  //     })
  // })

  return (
    <>
      <h1>Welcome from App!</h1>
      <Router>
        <ul>
          <li>
            <Login />
          </li>
          <li>
            <Logout />
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