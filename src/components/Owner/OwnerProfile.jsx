import React from 'react';
import { Grid, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import Logout from '../Logout.jsx';

const barInfo = {
    Name: "The_BullDog",
    Address: "Canal St",
    PhoneNumber: "123456789"
}

const OwnerProfile = ({ setViewValue }) => {
    const [open, setOpen] = React.useState(false);

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
                    @{barInfo.Name}
                </Typography>
            </Grid>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                My Information
            </Button>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Current Occupency
            </Button>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Call emergency Contact
            </Button>
            <Logout setViewValue={setViewValue} />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"This will have information"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This Dialog will include information regarding this button's title
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>

    )
}

export default OwnerProfile;