import React, { useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { Button } from '@material-ui/core';
import Axios from 'axios';

const clientId = `709018099538-fo63v57kbv8vnpft4u5bdsp65bjbcc7b.apps.googleusercontent.com`

const Login = () => {
    const onSuccess = (res) => {
        console.log('[LOGIN SUCCESS] currentUser:', res.profileObj);
    }

    const onFailure = (res) => {
        console.log('[LOGIN FAILER] currentUser:', res)
    }

    //play "LET ME IN" GIF

    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                render={renderProps => (
                    <Button variant="outlined" onClick={renderProps.onClick}>Login With Google</Button>
                )}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    )
}

export default Login;
