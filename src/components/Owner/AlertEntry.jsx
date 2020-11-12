import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import axios from 'axios';

const AlertEntry = ({ customer, barId, count }) => {

    const [drinkTotal, setDrinkTotal] = useState();
    const [customerData, setCustomerData] = useState({});

    const customerInfo = () => {
        axios.get(`/db/customer/getFriendById?customerId=${customer}`)
            .then(({ data }) => {
                console.log(data)
                setCustomerData(data)
            })
            .catch(err => console.warn(err))
    }

    useEffect(() => {
        axios.get(`/db/drinks/alerts?customer=${customer}&barId=${barId}&count=${count}`)
            .then(({ data }) => {
                if (data > 8) {
                    setDrinkTotal(data);
                    customerInfo();
                }
            })
    }, [])

    return (
        <div>
            {drinkTotal}
            {customerData.first_name}
        </div>
    )
}

export default AlertEntry
