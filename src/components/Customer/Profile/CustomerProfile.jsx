import React, { useState, useEffect } from 'react';
import Home from './Home.jsx';
import EContact from './EContact.jsx';
import Favorite from './Favorite.jsx';
import Translate from './Translate.jsx';
import Checkin from './Checkin.jsx';
import History from './History.jsx';

const CustomerProfile = ({ setViewValue }) => {
  const [customerId, setCustomerId] = useState(1);
  const [view, setView] = useState('Home');
  const [data, setData] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REDIRECT}/db/customer`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        setData(data[1])
        setCustomerId(data[1].id)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  switch (view) {
    case 'Home':
      return <Home setView={setView} name={data.user_name} setViewValue={setViewValue} />
    case 'EContact':
      return <EContact setView={setView} customerId={customerId} />
    case 'Checkin':
      return <Checkin setView={setView} customerId={customerId} />
    case 'History':
      return <History setView={setView} customerId={customerId} />
    case 'Favorite':
      return <Favorite setView={setView} customerId={customerId} />
    case 'Translate':
      return <Translate setView={setView} customerId={customerId} />
  }
}

export default CustomerProfile;