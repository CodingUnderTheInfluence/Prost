import React, { useState, useEffect } from 'react'
import { Button, Grid, makeStyles, ButtonGroup } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckIcon from '@material-ui/icons/Check';
import Axios from 'axios';

const useStyles = makeStyles({
    confirmedFriend: {
        borderTop: 'black solid 1px',
        borderBottom: 'black solid 1px'
    },
    userName: {
        textAlign: 'center',
        fontSize: '20px',
        margin: "0 10px 0 0"
    },
});

const IncomingFriend = ({ r, setIncomingRequests, incomingRequests, setConfirmedFriends, confirmedFriends, index }) => {
    const [person, setPerson] = useState();
    const classes = useStyles();

    const getData = () => {
        Axios.get(`/db/customer/getFriendById?customerId=${r.id_customer}`)
            .then(({ data }) => {
                setPerson(data)
            })
            .catch(err => console.warn(err))
    };

    useEffect(() => {
        getData();
    }, [])

    const acceptRequest = () => {
        Axios.put('/db/friendship/acceptRequest', { data: r })
            .then(() => {
                addFriend()
            })
            .catch(err => console.warn(err))
    }
    const addFriend = () => {
        let updatedIncomingArr = incomingRequests.slice()
        updatedIncomingArr.splice(index, 1)
        setIncomingRequests(updatedIncomingArr)
        setConfirmedFriends([...confirmedFriends, r])

    }

    const rejectFriend = () => {
        let updatedIncomingArr = incomingRequests.slice();
        updatedIncomingArr.splice(index, 1)
        setIncomingRequests(updatedIncomingArr);
    }

    const rejectRequest = () => {
        Axios.delete('/db/friendship/removeRequest', { data: r })
            .then(() => {
                rejectFriend();
            })
            .catch(err => console.warn(err))

    };

    if (person) {
        return (
            <Grid container item justify='space-between' direction="row" className={classes.confirmedFriend}>
                <Grid container item direction="column" xs={5} className={classes.userName}>
                    {`${person.first_name} ${person.last_name}`}
                </Grid>
                <Grid container item direction="column" xs={3}>
                    <ButtonGroup variant="text">
                        <Button onClick={acceptRequest}><CheckIcon /></Button>
                        <Button onClick={rejectRequest}><CancelIcon /></Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        )
    } else {
        return (
            <div>
                Loading Friend Data
            </div>
        )
    }
}

export default IncomingFriend