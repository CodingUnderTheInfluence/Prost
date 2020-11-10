import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import axios from 'axios';
import CustomerEntry from './CustomerEntry.jsx'

const BarList = ({ barId }) => {
    const [customerList, setCustomerList] = useState([]);

    useEffect(() => {
        axios.get(`/db/cb/list?barId=${barId}`)
            .then(({ data }) => {
                console.log(data)
                setCustomerList(data);
            })
    }, [])

    if (customerList.length === 0) {
        return (
            <Grid container direction="column" justify="center" alignItems="center">
                <Grid item container direction="row" justify="center" alignItems="center">
                    <h1>No Customers Checked In</h1>
                </Grid>
            </Grid>
        )
    } else {
        return (
            <Grid container direction="column" justify="center" alignItems="center">
                <Grid item container direction="row" justify="center" alignItems="center">
                    <h1>CUSTOMER LIST</h1>
                </Grid>
                {customerList.map(customer => { return <CustomerEntry customer={customer} /> })}
            </Grid>
        )
    }
}
export default BarList;