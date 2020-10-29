import React from 'react'
import { GoogleLogout } from 'react-google-login';
import { Button } from '@material-ui/core';

const clientId = `709018099538-fo63v57kbv8vnpft4u5bdsp65bjbcc7b.apps.googleusercontent.com`

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
