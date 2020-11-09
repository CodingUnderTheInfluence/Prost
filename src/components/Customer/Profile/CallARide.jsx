import React, { useState } from 'react'
import { Grid, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const useStyles = makeStyles({
    root: {
        maxWidth: 500,
        borderRadius: '10px',
    },
    button: {
        variant: "contained",
        color: "primary",
        padding: "5px",
        margin: "10px 0 10px 0"
    },
    Grid: {
        justify: "center",
        alignItems: "center",
    }
});

const CallARide = ({ friendNumber, setView }) => {
    const classes = useStyles();
    return (
        <Grid container direction="column" className={classes.Grid}>
            <Grid item direction="row" justify="left">
                <ArrowBackIosIcon color="primary" onClick={() => setView('Home')} />
            </Grid>
            <Grid item direction="row" className={classes.Grid}>
                <Typography variant="subtitle1">
                    Don't be a fool! Call for a ride!
                </Typography>
            </Grid>
            <Grid item direction="row" className={classes.Grid}>
                <Button variant="contained" color="primary" className={classes.button} href="https://www.uber.com/us/en/ride/" target="_blank">
                    Uber
                </Button>

            </Grid>
            <Grid item direction="row" className={classes.Grid}>
                <Button variant="contained" color="primary" className={classes.button} href="https://ride.lyft.com/" target="_blank">
                    Lyft
                </Button>
            </Grid>
            <Grid item direction="row" className={classes.Grid}>
                <Button variant="contained" color="primary" className={classes.button} href={`tel:+1${friendNumber}`}>
                    Friend
                </Button>
            </Grid>
        </Grid>
    )
}

export default CallARide
