import React from 'react'
import { GoogleLogout } from 'react-google-login';
import { Button } from '@material-ui/core';

const clientId = `838925295609-rh25afhf4it1rstq51pumhspvr7r09j7.apps.googleusercontent.com`

function Logout() {
    const onSuccess = () => {
        alert('Logout made successfully')
    };
    //remember to add audio song for logout message
    //on logout ==== "GET THE FUCK OUT"


    return (
        <div>
            <GoogleLogout
                clientId={clientId}
                render={renderProps => (
                    <Button variant="outlined" onClick={renderProps.onClick}>Logout With Google</Button>
                )}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
            ></GoogleLogout>
        </div>
    )
}

export default Logout
