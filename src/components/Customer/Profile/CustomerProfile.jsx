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

    useEffect(()=>{}, [view]);

    switch(view){
        case 'Home':
        return <Home setView={setView}/>
        case 'EContact':
        return <EContact setView={setView}/>
        case 'Checkin':
        return <Checkin setView={setView}/>
        case 'History':
        return <History setView={setView}/>
        case 'Favorite':
        return <Favorite setView={setView}/>
        case 'Translate':
        return <Translate setView={setView}/>
    }
}

export default CustomerProfile;