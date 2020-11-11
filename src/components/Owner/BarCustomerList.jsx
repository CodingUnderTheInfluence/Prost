import React, { useState, useEffect } from 'react';
import { Grid, Typography, Divider, Paper } from '@material-ui/core';
import axios from 'axios';
import CustomerEntry from './CustomerEntry.jsx';
import PhoneIcon from '@material-ui/icons/Phone';
import PlusOneIcon from '@material-ui/icons/PlusOne';

const BarList = ({ customerList }) => {
    if (customerList.length === 0) {
        return (
            <Grid container direction="column" justify="center" alignItems="center">
                <Grid item container direction="row" justify="center" alignItems="center">
                    <Typography variant="subtitle1">
                        No Customers Currently Checked In
                    </Typography>
                </Grid>
            </Grid>
        )
    } else {
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
                    {customerList.map(customer => { return <CustomerEntry customer={customer} customerList={customerList} /> })}
                </Grid>
            </Grid>
        )
    }
}
export default BarList;