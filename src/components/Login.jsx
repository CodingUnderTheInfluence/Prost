import React, { useEffect, useState } from 'react'
import { GoogleLogin } from 'react-google-login';
import Axios from 'axios'
import { Button } from '@material-ui/core'

const clientId = '933644302187-agamsig0qalm5oi4fd44v11hfffpchs8.apps.googleusercontent.com'

const Login = ({ setViewValue, setId, setProfileImage, setUsername }) => {

    useEffect(() => {
        Axios.get('/db/customer')
            .then(({ data }) => { console.log('DATA') })
            .catch((err) => { console.error(err) })
    }, [])


    const onSuccess = (res) => {
        // console.log('[Login Success] currentUser:', res.profileObj)
        const token = res.tokenId;
        const profile = res.profileObj;
        const googleProfile = {
            gProfile: profile
        }
        const googleToken = {
            authToken: token,
        }
        setId(profile.googleId);
        setProfileImage(profile.imageUrl);
        setUsername(profile.name);
        // console.log(localStorage);
        // Axios.post('/db/customer', { googleToken }); //this is a post to check for the google token
        Axios.post('/db/customer/check', { googleProfile, googleToken })
            .then(({ data }) => {
                // console.log(data);
                if (data === 'customer') {
                    setViewValue('CustomerView')
                    localStorage.setItem('customerToken', res.tokenId)
                } else if (data === 'Owner') {
                    setViewValue('OwnerView')
                    localStorage.setItem('ownerToken', res.tokenId)
                } else if (data === 'form') {
                    setViewValue('form')
                }
            })
        Axios.post('/db/maps', {
            userName: profile.name,
            gId: profile.googleId
        })
            .then(({ data }) => console.log('post to maps in login', data));
    }

    const onFailure = (res) => {
        console.log('[Login Failure] res:', res)
    }
    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                render={renderProps => (
                    <Button variant="outlined" color="primary" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                        Login Here
                    </Button>
                )}
                buttonText='Login'
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                style={{ marginTop: '100px' }}
                isSignedIn={true}
            />
        </div>
    )
}

export default Login
