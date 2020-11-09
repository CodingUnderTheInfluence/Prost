import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import CustomerList from './CustomerList.jsx'

const BarList = ({ customerList, barId }) => {
    if (customerList.length === 0) {
        return (
            <Grid container direction="column" justify="center" alignItems="center">
                <Grid item container direction="row" justify="center" alignItems="center">
<<<<<<< HEAD
                    <Typography variant="subtitle1">
                        No Customers Currently Checked In
                    </Typography>
=======
                    <h1>No Customers Checked In</h1>
>>>>>>> ab46038... (update) owners can now see customers that have checked into their bar
                </Grid>
            </Grid>
        )
    } else {
        return (
<<<<<<< HEAD
            <CustomerList customerList={customerList} barId={barId} />
=======
            <Grid container direction="column" justify="center" alignItems="center">
                <Grid item container direction="row" justify="center" alignItems="center">
                    <h1>CUSTOMER LIST</h1>
                </Grid>
                {customerList.map(customer => { return <CustomerEntry customer={customer} /> })}
            </Grid>
>>>>>>> ab46038... (update) owners can now see customers that have checked into their bar
        )
    }
}
export default BarList;