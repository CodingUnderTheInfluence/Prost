import React from 'react';
import {
  Grid,
  Button,
  Typography,
  TextField,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    flexGrow: 1,
    justify: 'center',
    background: 'transparent',
  },
  backBtn: {
    opacity: '60%',
  },
  input: {
    margin: '5px 0 5px 0',
  },
});

const Location = ({
  setAddress,
  setCity,
  setCounter,
  setState,
  setZip,
  locationInformationSubmit,
  handleBack,
  handleNext,
}) => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="center"
        column="center"
        className={classes.input}
      >
        <Typography variant="subtitle1">
          Location Information
        </Typography>
      </Grid>
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="center"
        column="center"
        className={classes.input}
      >
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="Address"
          onChange={(e) => { setAddress(e.target.value); }}
        />
      </Grid>
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="center"
        column="center"
        className={classes.input}
      >
        <Grid
          item
          container
          direction="row"
          justify="center"
          alignItems="center"
          column="center"
          className={classes.input}
        >
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="City"
            onChange={(e) => { setCity(e.target.value); }}
          />
        </Grid>
        <Grid
          item
          container
          direction="row"
          justify="center"
          alignItems="center"
          column="center"
          className={classes.input}
        >
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="State"
            onChange={(e) => { setState(e.target.value); }}
          />
        </Grid>
        <Grid
          item
          container
          direction="row"
          justify="center"
          alignItems="center"
          column="center"
          className={classes.input}
        >
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Zip Code"
            onChange={(e) => { setZip(Number(e.target.value)); }}
          />
        </Grid>
      </Grid>
      <Button
        variant="outlined"
        color="primary"
        size="medium"
        onClick={() => {
          handleNext();
          setCounter(3);
          locationInformationSubmit();
        }}
      >
        Next
      </Button>
    </Grid>
  );
};

export default Location;
