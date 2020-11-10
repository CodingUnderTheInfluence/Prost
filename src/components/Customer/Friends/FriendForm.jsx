import React, {useState} from 'react'
import {Button, Grid, TextField, List} from '@material-ui/core';
import Axios from 'axios';
import FoundUser from './FoundUser.jsx';

function FriendForm({setAddFriend, userData, setViewValue}) {
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
            .then(({data}) => {
                setResults(data);
            })
            .catch(err => console.warn(err))
    }

    return (
        <div>
            <Button onClick={()=> setViewValue('FriendsList')}>Back</Button>
            <TextField placeholder='username' onChange={(event) => handleChange(event)}/>
            <Grid>
                <List>
                    {results.map(u =><FoundUser userData={userData} u={u} /> )}
                </List>
            </Grid>
        </div>
    )
}
export default FriendForm