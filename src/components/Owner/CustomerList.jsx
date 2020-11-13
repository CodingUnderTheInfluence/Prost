import React from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import CustomerEntry from './CustomerEntry.jsx';
import PhoneIcon from '@material-ui/icons/Phone';
import PlusOneIcon from '@material-ui/icons/PlusOne';

const CustomerList = ({ customerList, barId }) => {
    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Grid item container direction="row" justify="center" alignItems="center">
                <h1>CUSTOMER LIST</h1>
            </Grid>
            <Grid item container direction="row" justify="center" alignItems="center" style={{ border: "solid 5px black", height: "5px" }}>
            </Grid>
            <Grid item container direction="row" justify="center" alignItems="center">
                <Grid item container direction="column" xs={3} justify="center" alignItems="center">
                    <Typography variant="subtitle1">
                        Name
                        </Typography>
                </Grid>
                <Grid item container direction="column" justify="center" alignItems="center" xs={3}>
                    Call
                    </Grid>
                <Grid item container direction="column" xs={3} justify="center" alignItems="center">
                    Add Drink
                    </Grid>
            </Grid>
            <Grid item container direction="row" justify="center" alignItems="center">
                {customerList.map(customer => { return <CustomerEntry customer={customer} customerList={customerList} barId={barId} /> })}
            </Grid>
        </Grid>
    )
}

export default CustomerList
