import React, { useState } from 'react';
import { makeStyles, Paper, Tabs, Tab, Grid, Button, Typography } from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import TocOutlinedIcon from '@material-ui/icons/TocOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import BarList from './BarCustomerList.jsx';
import OwnerProfile from './OwnerProfile.jsx';
import QrScanner from './QrCodeScanner.jsx';




const useStyles = makeStyles({
    root: {
        maxWidth: 500,
        borderRadius: '10px'
    },
    stickToBottom: {
        width: '100vw',
        position: 'sticky',
        bottom: '0',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: '10px',
        border: 'solid #0365b0 1px'
    }
});

const OwnerView = ({ setViewValue }) => {
    const classes = useStyles();
    const [value, setValue] = useState();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const renderView = () => {
        if (value === 0) {
            return <BarList />
        }
        if (value === 1) {
            return <QrScanner />
        }
        if (value === 2) {
            return <OwnerProfile setViewValue={setViewValue} />
        }
        return (<div>PLACE INSTRUCTIONS HERE</div>)
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
                        <Tab icon={<CameraAltOutlinedIcon />} label="Scan QR" />
                        <Tab icon={<AccountCircleOutlinedIcon />} label="Profile" />
                    </Tabs>
                </Paper>
            </Grid>
        </Grid>
    );
}
export default OwnerView;