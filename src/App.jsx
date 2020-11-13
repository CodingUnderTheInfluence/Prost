import React, { useState, useEffect } from 'react';
import {
    Route,
    Switch,
    BrowserRouter
} from "react-router-dom";
import { useHistory } from 'react-router-dom'
import LandingPage from './components/LandingPage.jsx';
import CustomerView from './components/Customer/CustomerView.jsx';
import OwnerView from './components/Owner/OwnerView.jsx';

const App = () => {
    const history = useHistory();
    const [value, setViewValue] = useState('');
    const [gId, setId] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [username, setUsername] = useState('');
    const [gEmail, setGEmail] = useState('');
    const [mapLatLng, setMapLatLng] = useState('');
    const [userId, setUserId] = useState('');
    const [barId, setBarId] = useState();

    // useEffect(() => {
    //     if (localStorage.customerToken) {
    //         history.push('/customer')
    //     } else if (localStorage.ownerToken) {
    //         history.push('/owner')
    //     }
    // }, []);

    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route
                        exact={true}
                        path="/"
                        component={LandingPage}
                    >
                        <LandingPage
                            setId={setId}
                            setProfileImage={setProfileImage}
                            setUsername={setUsername}
                            gId={gId}
                            username={username}
                            profileImage={profileImage}
                            setGEmail={setGEmail}
                            gEmail={gEmail}
                            mapLatLng={mapLatLng}
                            setBarId={setBarId}
                        />
                    </Route>
                    <Route
                        path="/owner"
                        component={OwnerView}
                    >
                        <OwnerView
                            barId={barId}
                        />
                    </Route>
                    <Route
                        path="/customer"
                        component={CustomerView}
                    >
                        <CustomerView
                            gId={gId}
                            username={username}
                            userId={userId}
                            setMapLatLng={setMapLatLng}
                            setId={setId}
                            setUsername={setUsername}
                        />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App;
