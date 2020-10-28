import React, {useState, useEffect, useLayoutEffect} from 'react';
import { Grid, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'

const barInfo = {
    Name: "The_BullDog",
    Address: "Canal St",
    PhoneNumber: "123456789"
}

const CustomerProfile = () => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState(false);
    const [customerId, setCustomerId] = useState(1);

    useLayoutEffect(() => {
      fetch(`${process.env.REDIRECT}/db/customer`, {
        method: 'GET',
        // headers: {
        //   'Content-Type': 'application/json',
        // },
        // body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data[0]); // arr
        setData(data[0])
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Grid item container direction="row" justify="center" alignItems="center">
                <img src="https://i.imgur.com/jRnsxbB.png" style={{ height: '100px', width: '100px' }} />
            </Grid>
            <Grid item container direction="row" justify="center" alignItems="center">
                <Typography variant="subtitle1">
                    @{data.user_name}
                </Typography>
            </Grid>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Favorite Spots
            </Button>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Emergency Contact
            </Button>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Check in
            </Button>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                History
            </Button>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Translate
            </Button>
            <Button variant="outlined" color="primary">
                Logout
            </Button>
        </Grid>

    )
}

export default CustomerProfile;