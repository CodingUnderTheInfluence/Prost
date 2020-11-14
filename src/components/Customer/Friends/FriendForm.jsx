import React, { useState } from 'react'
import { Button, Grid, TextField, List, makeStyles, InputAdornment, Input, TextareaAutosize } from '@material-ui/core';
import Axios from 'axios';
import FoundUser from './FoundUser.jsx';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const useStyles = makeStyles({
    size: {
        height: '90vh',
        width: '100%'
    },
    userList: {
        height: 'auto',
        overflow: 'auto'
    }

});

function FriendForm({ setAddFriend, userData, setViewValue }) {
    const classes = useStyles();
    const [searchCriteria, setSearchCriteria] = useState('');
    const [results, setResults] = useState([]);


    const handleChange = (event) => {
        setSearchCriteria(event.target.value);
        if (searchCriteria.length && searchCriteria.length % 3 === 0) {
            searchUsers(searchCriteria)
        }
    }

    const searchUsers = (str) => {
        Axios.get(`/db/customer/search?username=${str}`)
            .then(({ data }) => {
                setResults(data);
            })
            .catch(err => console.warn(err))
    }

    return (
        <Grid className={classes.size}>
            <Button onClick={() => setViewValue('FriendsList')}><ArrowBackIosIcon size="small" /></Button>
            <TextField placeholder='username' onChange={(event) => handleChange(event)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <AccountCircle />
                        </InputAdornment>
                    ),
                }} />
            <Grid container item direction='column' className={classes.userList}>
                <List>
                    {results.map(u => <FoundUser userData={userData} u={u} />)}
                </List>
            </Grid>
        </Grid>
    )
}
export default FriendForm