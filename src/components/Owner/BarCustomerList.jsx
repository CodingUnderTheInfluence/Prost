import React from 'react';
import { Grid, Typography } from '@material-ui/core';

const BarList = () => {
    let blank;

    const arr = [
        { name: "Larry", number: "123456" },
        { name: "bri", number: "123456" },
        { name: "jon", number: "123456" },
        { name: "chris", number: "123456" },
    ]

    const renderCustomer = () => {
        return (
            <Grid item container direction="row">
                {arr.map((entry) => (
                    <Grid item container direction="row" style={{ border: 'solid 1px black', borderRadius: '10px', margin: "5px auto 5px auto" }}>
                        <Grid item container direction="row" justify="center" alignItems="center">
                            <Typography variant="subtitle1">
                                name: {entry.name}
                            </Typography>
                        </Grid>
                        <Grid item container direction="row" justify="center" alignItems="center">
                            <Typography variant="subtitle1">
                                number: {entry.number}
                            </Typography>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        )
    }

    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Grid item container direction="row" justify="center" alignItems="center">
                <h1>CUSTOMER LIST</h1>
            </Grid>
            <Grid item container direction="row">
                {renderCustomer()}
            </Grid>
        </Grid>
    )
}
export default BarList;