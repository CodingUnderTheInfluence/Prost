import React from 'react'
import { Grid, Button, Typography, TextField, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel } from '@material-ui/core';
import SafetyDialog from './Dialog.jsx';
import axios from 'axios';

function OwnerForm() {

    const renderOwnerForm = () => {
        return (
            <SafetyDialog />
        )
    }
    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Grid item container direction="row" justify="center" alignItems="center">
                {renderOwnerForm()}
            </Grid>
        </Grid>
    )
}

export default OwnerForm
