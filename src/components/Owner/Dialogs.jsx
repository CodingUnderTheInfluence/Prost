import React from 'react';
import {
  Grid,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Toolbar,
  AppBar,
  Divider,
  IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import propTypes from 'prop-types';
import InputItem from './Menu/InputItem.jsx';
import BarMenuList from './Menu/BarMenuList.jsx';

const Dialogs = ({
  occupencyStatus,
  barAddress,
  barNumber,
  barId,
  barName,
  capacity,
  handleCloseInfo,
  handleCloseOcc,
  handleCloseMenu,
  handleClose,
  openInfo,
  openOcc,
  openMenu,
  open,
  count,
}) => (
  <div>
    {/* THIS IS THE INFO DIALOG */}
    <Dialog
      open={openInfo}
      onClose={handleCloseInfo}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Bar Information</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Grid container direction="column" justify="center" alignItems="center">
            <Grid item container direction="row" justify="center" alignItems="center">
              <Typography variant="subtitle1">
                Bar:
                {' '}
                {barName}
              </Typography>
            </Grid>
            <Grid item container direction="row" justify="center" alignItems="center">
              <Typography variant="subtitle2">
                Address:
                {' '}
                {barAddress}
              </Typography>
            </Grid>
            <Grid item container direction="row" justify="center" alignItems="center">
              <Typography variant="subtitle2">
                PhoneNumber:
                {' '}
                {barNumber}
              </Typography>
            </Grid>
            <Grid item container direction="row" justify="center" alignItems="center">
              <Typography variant="subtitle2">
                Bar Capacity:
                {' '}
                {capacity}
              </Typography>
            </Grid>
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
      <DialogTitle id="alert-dialog-title">Occupency Information</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography variant="subtitle1">
            {`Current Amount of People: ${count}`}
            {occupencyStatus()}
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseOcc} color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>

    {/* THIS IS THE MENU DIALOG */}
    <Dialog
      fullScreen
      open={openMenu}
      onClose={handleCloseMenu}
      aria-labelledby="form-dialog-title"
      aria-describedby="form-dialog-description"
    >
      <AppBar>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleCloseMenu} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6">
            Menu
          </Typography>
        </Toolbar>
      </AppBar>
      <DialogTitle id="form-dialog-title">Menu Information</DialogTitle>
      <DialogContent>
        <Typography variant="h6">
          Add Menu Item
        </Typography>
        <InputItem barId={barId} />
        <Divider />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">
              Current Menu
            </Typography>
            <BarMenuList barId={barId} />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>

    {/* THIS IS A NORMAL DIALOG */}
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">This will have information</DialogTitle>
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
);

export default Dialogs;

Dialogs.propTypes = propTypes.any;
