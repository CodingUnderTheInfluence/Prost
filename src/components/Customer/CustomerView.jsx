import React, { useState } from 'react';
import { makeStyles, Paper, Tabs, Tab, Grid, Button, Typography, BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ForumIcon from '@material-ui/icons/Forum';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Create from './Create.jsx';
import FriendsList from './Social/FriendsList.jsx';
import Messages from './Social/Messages.jsx';
import Logout from '../Logout.jsx'
import CustomerProfile from './Profile/CustomerProfile.jsx';
import regeneratorRuntime from "regenerator-runtime";



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

const CustomerView = ({ setViewValue, gId }) => {
    const classes = useStyles();
    const [value, setValue] = useState();

    const handleChange = (event, newValue) => {
        setValue(newValue);
        // console.log('!!!!CustomerView', gId)
    };

    const renderView = () => {
        if (value === 0) {
            return <FriendsList />
        }
        if (value === 1) {
            return <Create />
        }
        if (value === 2) {
            return <Messages />
        }
        if (value === 3) {
            return <CustomerProfile setViewValue={setViewValue} gId={gId} />
        }
        return (<div>PLACE INSTRUCTIONS HERE</div>)
    }
    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Grid item container direction="row" justify="center" alignItems="center">
                {renderView()}
            </Grid>
            <Grid item container direction="row" justify="center" alignItems="center">
                <Paper className={classes.root}>
                    <BottomNavigation
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                        className={classes.stickToBottom}
                    >
                        <BottomNavigationAction icon={<PeopleAltIcon />} label="Friends" />
                        <BottomNavigationAction icon={<AddCircleOutlineIcon />} label="Create" />
                        <BottomNavigationAction icon={<ForumIcon />} label="Messages" />
                        <BottomNavigationAction icon={<AccountCircleOutlinedIcon />} label="Profile" />
                    </BottomNavigation>
                </Paper>
            </Grid>
        </Grid>
    );
}
export default CustomerView;