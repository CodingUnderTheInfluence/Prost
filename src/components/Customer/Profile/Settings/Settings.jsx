import React from 'react';
import { Grid, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    borderRadius: '10px',
  },
  button: {
    variant: 'contained',
    color: 'primary',
    padding: '5px',
    margin: '10px 0 10px 0',
  },
  Grid: {
    justify: 'center',
    alignItems: 'center',
  },
  backBtn: {
    opacity: '60%',
  },
});

const Settings = ({
  setView,
}) => {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Button
        variant="contained"
        color="primary"
        onClick={() => { setView('EditContact'); }}
        className={classes.button}
      >
        Edit Emergency Contact
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => { setView('EditUsername'); }}
        className={classes.button}
      >
        Edit Username
      </Button>
      <Button
        size="small"
        color="primary"
        className={classes.backBtn}
        onClick={() => setView('Home')}
      >
        Back
      </Button>
    </Grid>

  );
};

export default Settings;
