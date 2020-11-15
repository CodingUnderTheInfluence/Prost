import React, { useEffect, useState } from 'react';
import {
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const SafetyDialog = ({ setCounter, setLandingView }) => {
  const history = useHistory();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const deleteLocal = () => {
    delete localStorage.token;
    history.push('/');
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Disclaimer</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography variant="subtitle1">
            Information Collected will only be shared with emergency services as required during Covid-19 Pandemic.
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            deleteLocal();
            handleClose;
            setLandingView('');
          }}
          color="primary"
        >
          Disagree
        </Button>
        <Button
          onClick={() => {
            handleClose;
            setCounter(1);
          }}
          color="primary"
          autoFocus
        >
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SafetyDialog;
