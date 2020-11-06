import React, {useState} from 'react'
import {Button, Grid, TextField, List} from '@material-ui/core';
import Axios from 'axios';
import FoundUser from './FoundUser.jsx';

function FriendForm({setAddFriend, userData}) {
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
                console.log(data,'success')
                setResults(data);
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <Button onClick={()=> setAddFriend(false)}>Back</Button>
            <TextField placeholder='username' onChange={(event) => handleChange(event)}/>
            <Grid>
                <List>
                    {results.map(u =><li><FoundUser userData={userData} u={u} /></li> )}
                </List>
            </Grid>
        </div>
    )
}

export default FriendForm
