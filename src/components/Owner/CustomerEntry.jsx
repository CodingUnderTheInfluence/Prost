import React, { useState, useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core';
import AddDrink from './AddDrink.jsx'
import PhoneIcon from '@material-ui/icons/Phone';
import axios from 'axios';


<<<<<<< HEAD
const CustomerEntry = ({ customer, barId }) => {

    const [customerData, setCustomerData] = useState();
    const [drink, setDrinkCount] = useState('');
    const getCustomerData = () => {
        axios.get(`/db/customer/getFriendById?customerId=${customer}`)
            .then(({ data }) => {
=======
const CustomerEntry = ({ customer }) => {

    const [customerData, setCustomerData] = useState();
    const getCustomerData = () => {
        console.log(typeof customer, 'CUSTOMER')
        axios.get(`/db/customer/getFriendById?customerId=${customer}`)
            .then(({ data }) => {
                console.log(data, 'DATA')
>>>>>>> ab46038... (update) owners can now see customers that have checked into their bar
                setCustomerData(data)
            })
            .catch(err => console.warn(err))
    }

    useEffect(() => {
        getCustomerData();
    }, [])

<<<<<<< HEAD
    if (customerData) {
        return (
            <Grid container direction="column" justify="center" alignItems="center" style={{ border: "solid black 1px", borderRadius: "5px", marginTop: "5px", marginBottom: "5px" }}>
                <Grid item container direction="row" justify="center" alignItems="center">
                    <Grid item container direction="column" xs={5} justify="center" alignItems="center">
                        <Typography variant="subtitle1">
                            {`${customerData.first_name} ${customerData.last_name}`}
                        </Typography>
                    </Grid>
                    <Grid item container direction="column" justify="center" alignItems="center" xs={3}>
                        <a href={`tel:+1${customerData.phone_number}`}><PhoneIcon /></a>
                    </Grid>
                    <Grid item container direction="column" xs={4} justify="center" alignItems="center">
                        <AddDrink id={customerData.id} barId={barId} setDrinkCount={setDrinkCount} />
                    </Grid>
                    <Grid item container direction="column" xs={4} justify="center" alignItems="center">
                        Current total: {drink}
                    </Grid>
=======


    if (customerData) {
        return (
            <Grid container direction="column" justify="center" alignItems="center" style={{ border: "solid black 1px", borderRadius: "5px" }}>
                <Grid item container direction="row" justify="center" alignItems="center">
                    <Typography variant="subtitle1">
                        {`${customerData.first_name} ${customerData.last_name}`}
                    </Typography>
                </Grid>
                <Grid item container direction="row" justify="center" alignItems="center">
                    <Typography variant="subtitle2">
                        {customerData.phone_number} <a href={`tel:+1${customerData.phone_number}`} ><PhoneIcon /></a>
                    </Typography>
>>>>>>> ab46038... (update) owners can now see customers that have checked into their bar
                </Grid>
            </Grid>
        )
    } else {
        return (
            <div>
                Loading Customer Data...
            </div>
        )
    }
}

export default CustomerEntry
