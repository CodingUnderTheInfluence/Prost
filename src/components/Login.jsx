import React, { useEffect } from 'react'
import { GoogleLogin } from 'react-google-login';
import Axios from 'axios'

const clientId = '933644302187-agamsig0qalm5oi4fd44v11hfffpchs8.apps.googleusercontent.com'

const Login = () => {

    useEffect(() => {
        Axios.get('/db/customer')
            .then(({ data }) => { console.log(data, 'DATA') })
            .catch((err) => { console.error(err) })
    })


    const onSuccess = (res) => {
        console.log('[Login Success] currentUser:', res.profileObj)
        const token = res.tokenId;
        const profile = res.profileObj;
        const googleProfile = {
            gProfile: profile
        }
        const googleToken = {
            authToken: token,
        }
        localStorage.setItem('token', res.tokenId)
        console.log(localStorage);
        Axios.post('/db/customer', { googleToken })
        Axios.post('/db/customer/check', { googleProfile })
            .then(({ data }) => {
                if (!data) {
                    console.log('SEND TO SIGNUP FORM')
                }
            })
        // Axios.get('/db/customer/check')
        //     .then(({ data }) => {
        //         console.log('data', data)
        //     })
    }

    const onFailure = (res) => {
        console.log('[Login Failure] res:', res)
    }
    return (
        <div>
            <GoogleLogin
                clientId={clientId}
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
