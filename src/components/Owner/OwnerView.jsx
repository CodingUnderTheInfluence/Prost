import React, { useState } from 'react';
import { makeStyles, Paper, Tabs, Tab, Grid, Button, Typography } from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import TocOutlinedIcon from '@material-ui/icons/TocOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import BarList from './BarCustomerList.jsx';
import OwnerProfile from './OwnerProfile.jsx';
import WarningIcon from '@material-ui/icons/Warning';
import QrScanner from './QrCodeScanner.jsx'

const useStyles = makeStyles({
    root: {
        maxWidth: 500,
        borderRadius: '10px'
    },
    stickToBottom: {
        width: '100vw',
        position: 'fixed',
        bottom: '0',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: '10px',
        border: 'solid #0365b0 1px'
    }
});

const OwnerView = ({ setViewValue, barId }) => {
    const classes = useStyles();
    const [value, setValue] = useState();
    const [count, setCount] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const renderView = () => {
        if (value === 0) {
            return <BarList barId={barId} setCount={setCount} />
        }
        if (value === 1) {
            return <QrScanner />
        }
        if (value === 2) {
            return <OwnerProfile setViewValue={setViewValue} barId={barId} count={count} />
        }
        return (
            <Grid container direction="column" justify="center" alignItems="center">
                <Grid item container direction="row" justify="center" alignItems="center">
                    <Typography variant="subtitle1">
                        Welcome to your Owner Profile!
                    </Typography>
                </Grid>
                <Grid item container direction="row" justify="center" alignItems="center">
                    <Typography variant="subtitle2">
                        Here you will find helpful information regarding your bar.
                    </Typography>
                </Grid>
            </Grid>
        )
    }
    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Grid item container direction="row" justify="center" alignItems="center">
                {renderView()}
            </Grid>
            <Grid item container direction="row" justify="center" alignItems="center">
                <Paper className={classes.stickToBottom}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab icon={<TocOutlinedIcon />} label="Customers" />
                        <Tab icon={<WarningIcon />} label="Alerts" />
                        <Tab icon={<AccountCircleOutlinedIcon />} label="Profile" />
                    </Tabs>
                </Paper>
            </Grid>
        </Grid>
    );
}
export default OwnerView;