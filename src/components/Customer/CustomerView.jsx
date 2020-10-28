import React, { useState } from 'react';
import { makeStyles, Paper, Tabs, Tab, Grid, Button, Typography } from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import TocOutlinedIcon from '@material-ui/icons/TocOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ForumIcon from '@material-ui/icons/Forum';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Create from './Create.jsx';
import SocialView from './Social/SocialView.jsx';
import FriendsList from './Social/FriendsList.jsx';
import Messages from './Social/Messages.jsx';



const useStyles = makeStyles({
    root: {
        maxWidth: 500,
    },
});

const CustomerView = () => {
    const classes = useStyles();
    const [value, setValue] = useState();

    const handleChange = (event, newValue) => {
        setValue(newValue);
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
          return <OwnerProfile />
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
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab icon={<PeopleAltIcon />} label="Friends" />
                        <Tab icon={<AddCircleOutlineIcon />} label="Create" />
                        <Tab icon={<ForumIcon />} label="Messages" />
                        <Tab icon={<AccountCircleOutlinedIcon />} label="Profile" />
                    </Tabs>
                </Paper>
            </Grid>
        </Grid>
    );
}
export default CustomerView;