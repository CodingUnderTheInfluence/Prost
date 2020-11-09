import React, { useState, useEffect } from 'react';
import Home from './Home.jsx';
import EContact from './EContact.jsx';
import Favorite from './Favorite.jsx';
import Translate from './Translate.jsx';
import Checkin from './Checkin.jsx';
import History from './History.jsx';
import Friend from './Friend.jsx';
import CallARide from './CallARide.jsx';

const CustomerProfile = ({ setViewValue, gId }) => {
  const [customerId, setCustomerId] = useState(1);
  const [view, setView] = useState('Home');
  const [data, setData] = useState({
    user_name: ''
  });
  const [friendNumber, setFriendNumber] = useState();

  useEffect(() => {
    // console.info("customer profile", gId)
    fetch(`/db/customer/gId/${gId}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        console.info("PROFILE DATA", data)
        setData(data)
        setCustomerId(data.id)
        // setCustomerId(3) // test data
      })
      .catch((error) => {
        console.warn('Error:', error);
      });
  }, []);

  switch (view) {
    case 'Home':
      return <Home setView={setView} name={data.user_name} setViewValue={setViewValue} img={data.profile_image} />
    case 'EContact':
      return <EContact setView={setView} customerId={customerId} setFriendNumber={setFriendNumber} />
    case 'Checkin':
      return <Checkin setView={setView} customerId={customerId} />
    case 'History':
      return <History setView={setView} customerId={customerId} />
    case 'Favorite':
      return <Favorite setView={setView} customerId={customerId} />
    case 'Translate':
      return <Translate setView={setView} customerId={customerId} />
    case 'Friend':
      return <Friend setView={setView} customerId={customerId} />
    case 'Ride':
      return <CallARide setView={setView} customerId={customerId} friendNumber={friendNumber} />
  }
}

export default CustomerProfile;
