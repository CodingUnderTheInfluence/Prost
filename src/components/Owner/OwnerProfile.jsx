import React, { useState, useEffect } from 'react';
import {
    Grid,
    Typography,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Paper
} from '@material-ui/core';
import axios from 'axios';
import Logout from '../Logout.jsx';


const OwnerProfile = ({ setViewValue, barId }) => {

    /*
    This opens info Dialog
    */
    const [openInfo, setOpenInfo] = useState(false);
    const handleClickOpenInfo = () => {
        setOpenInfo(true);
    };

    const handleCloseInfo = () => {
        setOpenInfo(false);
    };
    /*
    This opens Occupency Dialog
    */
    const [openOcc, setOpenOcc] = useState(false);
    const handleClickOpenOcc = () => {
        setOpenOcc(true);
    };

    const handleCloseOcc = () => {
        setOpenOcc(false);
    };
    /*
    This opens normal Dialog
    */
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [barAddress, setBarAddress] = useState('');
    const [barNumber, setBarNumber] = useState('');
    const [barName, setBarName] = useState('')
    const [image, setImage] = useState('');
    const [occ, setOcc] = useState('');

    const barInfo = () => {
        axios.get(`/db/bar/info?id=${barId}`)
            .then(({ data }) => {
                setImage(data[0].profile_image);
                setBarName(data[0].bar_name);
                setBarAddress(data[0].address)
                setBarNumber(data[0].phone_number)
                setOcc(data[0].capacity);
            })
    }

    useEffect(() => {
        barInfo();
    }, [])

    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Grid item container direction="row" justify="center" alignItems="center">
                <img src={image} style={{ height: '100px', width: '100px' }} />
            </Grid>
            <Grid item container direction="row" justify="center" alignItems="center">
                <Typography variant="subtitle1">
                    @{barName}
                </Typography>
            </Grid>
            <Button variant="outlined" color="primary" onClick={handleClickOpenInfo}>
                My Information
                </Button>
            <Button variant="outlined" color="primary" onClick={handleClickOpenOcc}>
                Current Occupency
                </Button>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Call emergency Contact
                </Button>
            <Logout setViewValue={setViewValue} />


            {/* THIS IS THE INFO DIALOG */}
            <Dialog
                open={openInfo}
                onClose={handleCloseInfo}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Bar Information"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Grid container direction="column" justify="center" alignItems="center">
                            <Paper>
                                <Grid item container direction="row" justify="center" alignItems="center">
                                    <Typography variant="subtitle1">
                                        Bar: {barName}
                                    </Typography>
                                </Grid>
                                <Grid item container direction="row" justify="center" alignItems="center">
                                    <Typography variant="subtitle2">
                                        Address: {barAddress}
                                    </Typography>
                                </Grid>
                                <Grid item container direction="row" justify="center" alignItems="center">
                                    <Typography variant="subtitle2">
                                        PhoneNumber: {barNumber}
                                    </Typography>
                                </Grid>
                                <Grid item container direction="row" justify="center" alignItems="center">
                                    <Typography variant="subtitle2">
                                        Bar Capacity: {occ}
                                    </Typography>
                                </Grid>
                            </Paper>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseInfo} color="primary" autoFocus>
                        Close
                        </Button>
                </DialogActions>
            </Dialog>

            {/* THIS IS THE OCCUPENCY DIALOG */}
            <Dialog
                open={openOcc}
                onClose={handleCloseOcc}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Occupency Information"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Will Update as customers are added
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseOcc} color="primary" autoFocus>
                        Close
                        </Button>
                </DialogActions>
            </Dialog>


            {/* THIS IS A NORMAL DIALOG */}
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
