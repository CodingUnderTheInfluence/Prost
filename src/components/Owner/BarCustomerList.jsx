import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import axios from 'axios';
import CustomerEntry from './CustomerEntry.jsx'

const BarList = ({ barId, setCount }) => {
    const [customerList, setCustomerList] = useState([]);

    //TODO: Check out setInterval to grabbing the list of customers
    const fetchCustomers = () => {
        axios.get(`/db/cb/list?barId=${barId}`)
            .then(({ data }) => {
                setCustomerList(data);
                setCount(data.length);
            })
    }

    useEffect(() => {
        fetchCustomers();
        setTimeout(() => {
            fetchCustomers();
        }, 2000)
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