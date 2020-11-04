import React, { useState } from 'react';
import { Grid, Button, TextField } from '@material-ui/core';
import axios from 'axios';

function OwnerCredentials() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const credentialsSubmit = () => {
        const params = {
            email,
            password
        }
        axios.post('/db/owner/login', { params })
            .then(({ data }) => {
                console.log('token from owner', data); //=> should output token
            })
    }

    return (
        <Grid>
            <TextField label="Email" onChange={(e) => { setEmail(e.target.value) }} />
            <TextField label="Password" onChange={(e) => { setPassword(e.target.value) }} />
            <Button variant="outlined" onClick={() => { credentialsSubmit() }}>
                Submit
            </Button>
        </Grid>
    )
}

export default OwnerCredentials
