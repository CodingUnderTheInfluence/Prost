import React, { useState, useEffect } from 'react'
import { Button, makeStyles, Grid } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckIcon from '@material-ui/icons/Check';
import Axios from 'axios'

const useStyles = makeStyles({
    pendingFriend: {
        borderTop: 'black solid 1px',
        borderBottom: 'black solid 1px'
    },
    userName: {
        textAlign: 'center',
        fontSize: '20px',
        margin: "0 10px 0 0"
    },
})

function PendingFriend({ f, setPendingFriends, pendingFriends, index }) {

    const [data, setData] = useState();
    const [cancelled, setCancelled] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        Axios.get(`/db/customer/getFriendById?customerId=${f.id_friend}`)
            .then(({ data }) => {
                setData(data)
            })
            .catch(err => console.warn(err));
    };

    const removePendingRequest = () => {
        let updatedArr = pendingFriends.slice()
        updatedArr.splice(index, 1)
        setPendingFriends(updatedArr)
    }

    const cancelRequest = () => {
        Axios.delete('/db/friendship/removeRequest', { data: f })
            .catch(err => console.warn(err));
        removePendingRequest();
    }

    if (data) {
        return (
            <Grid container item direction="row" justify='space-between' className={classes.pendingFriend}>
                <Grid container item direction="column" xs={5} className={classes.userName}>
                    {data.user_name}
                </Grid>
                <Grid container item direction="column" xs={3}>
                    <Button onClick={() => cancelRequest()}>
                        <CancelIcon />
                    </Button>
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

export default PendingFriend;