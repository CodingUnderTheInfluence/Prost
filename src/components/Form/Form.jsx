import React, { useState } from 'react';
import CustomerForm from './Customer/CustomerForm.jsx';
import OwnerForm from './Owner/OwnerForm.jsx';
import { Grid, Button, Typography } from '@material-ui/core'

const Form = ({ setViewValue, gId, profileImage, username, mapLatLng }) => {
    const [formView, setFormView] = useState();

    const renderView = () => {
        if (formView === 'customer') {
            return <CustomerForm setViewValue={setViewValue} gId={gId} profileImage={profileImage} username={username} />
        }
        if (formView === 'owner') {
            return <OwnerForm setViewValue={setViewValue} />
        }
        return (
            <div>
                <Grid item container direction="row" justify="center" alignItems="center">
                    <Typography variant="subtitle1">
                        Where do you best fit?
                </Typography>
                </Grid>
                <Grid item container direction="row" justify="center" alignItems="center">
                    <Button variant="outlined" color="primary" onClick={() => setFormView('owner')}>
                        Owner
                </Button>
                </Grid>
                <Grid item container direction="row" justify="center" alignItems="center">
                    <Button variant="outlined" color="primary" onClick={() => setFormView('customer')}>
                        Customer
                </Button>
                </Grid>
            </div>
        )
    }

    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Grid item container direction="row" justify="center" alignItems="center">
                {renderView()}
            </Grid>
        </Grid>
    )
}

export default Form;
