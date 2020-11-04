import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import OwnerCredentials from './OwnerCredentials.jsx';

function OwnerLogin() {
    const [counter, setCounter] = useState(0);
    const renderOwner = () => {
        if (counter === 1) {
            return <OwnerCredentials />
        } else {
            return (<div />)
        }
    }
    return (
        <div>
            <Button
                variant="outlined"
                color="primary"
                onClick={() => setCounter(1)}
            >
                Owner Login
            </Button >
            { renderOwner()}
        </div>
    )
}

export default OwnerLogin
