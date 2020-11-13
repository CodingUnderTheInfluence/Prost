import React, { useState, useEffect } from 'react';
import {
    makeStyles,
    Paper,
    Tabs,
    Tab,
    Grid,
    Button,
    Typography
} from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import TocOutlinedIcon from '@material-ui/icons/TocOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import BarList from './BarCustomerList.jsx';
import OwnerProfile from './OwnerProfile.jsx';
import WarningIcon from '@material-ui/icons/Warning';
import Alerts from './Alerts.jsx'
import axios from 'axios';

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

const OwnerView = ({ barId }) => {
    const classes = useStyles();
    const [bar, setBar] = useState();
    const [value, setValue] = useState();
    const [count, setCount] = useState(0);
    const [barAddress, setBarAddress] = useState('');
    const [barNumber, setBarNumber] = useState('');
    const [barName, setBarName] = useState('')
    const [image, setImage] = useState('');
    const [capacity, setCapacity] = useState('');
    const [customerList, setCustomerList] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const barInfo = () => {
        axios.get(`/db/bar/info?id=${barId}`)
            .then(({ data }) => {
                setImage(data[0].profile_image);
                setBarName(data[0].bar_name);
                setBarAddress(data[0].address)
                setBarNumber(data[0].phone_number)
                setCapacity(data[0].bar_capacity);
            })
            .catch((err) => {
                console.warn(err)
            })
    }

    const fetchCustomers = () => {
        axios.get(`/db/cb/list?barId=${barId}`)
            .then(({ data }) => {
                setCustomerList(data);
                setCount(data.length);
            })
            .catch((err) => {
                console.warn(err)
            })
    }

    const getInfo = () => {
        fetchCustomers();
        barInfo();
    }

    useEffect(() => {
        /*
       Doesnt hit on first call

       hits on second
   */
        getInfo();
    }, [])

    const renderView = () => {
        if (value === 0) {
            return <BarList
                barId={barId}
                setCount={setCount}
                customerList={customerList}
            />
        }
        if (value === 1) {
            return <Alerts barId={barId} customerList={customerList} count={count} />
        }
        if (value === 2) {
            return <OwnerProfile
                count={count}
                barName={barName}
                barNumber={barNumber}
                barAddress={barAddress}
                image={image}
                capacity={capacity}
            />
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