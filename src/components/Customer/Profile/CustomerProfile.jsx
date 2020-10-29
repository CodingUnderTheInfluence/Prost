import React, {useState, useEffect, useLayoutEffect} from 'react';
import Home from './Home.jsx';
import EContact from './EContact.jsx';
import Favorite from './Favorite.jsx';
import Translate from './Translate.jsx';
import Checkin from './Checkin.jsx';
import History from './History.jsx';

const CustomerProfile = () => {
    const [customerId, setCustomerId] = useState(1);
    const [view, setView] = useState('Home');
    const [data, setData] = useState(false);

    useEffect(() => {
      fetch(`${process.env.REDIRECT}/db/customer`, {
        method: 'GET',
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data[2]); // change user
        setData(data[2])
        setCustomerId(data[2].id)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }, []);

    switch(view){
        case 'Home':
        return <Home setView={setView} name={data.user_name}/>
        case 'EContact':
        return <EContact setView={setView} customerId={customerId}/>
        case 'Checkin':
        return <Checkin setView={setView} customerId={customerId}/>
        case 'History':
        return <History setView={setView} customerId={customerId}/>
        case 'Favorite':
        return <Favorite setView={setView} customerId={customerId}/>
        case 'Translate':
        return <Translate setView={setView} customerId={customerId}/>
    }
}

export default CustomerProfile;