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

const Dialogs = ({
    occupencyStatus,
    barAddress,
    barNumber,
    barName,
    capacity,
    handleCloseInfo,
    handleCloseOcc,
    handleClose,
    openInfo,
    openOcc,
    open,
    count
}) => {

    return (
        <div>
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
                                        Bar Capacity: {capacity}
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
                        {count}
                        {occupencyStatus()}
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
        </div>
    )
}

export default Dialogs
