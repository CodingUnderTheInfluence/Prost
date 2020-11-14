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
  input: {
    margin: '5px 0 5px 0',
  },
});

const Personal = ({
  setPersonalFirst,
  setPersonalLast,
  setPersonalNumber,
  handleNext,
  setCounter,
  personalInformationSubmit,
}) => {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="center"
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
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="First Name"
          onChange={(e) => { setPersonalFirst(e.target.value); }}
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
          label="Last Name"
          onChange={(e) => { setPersonalLast(e.target.value); }}
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
          label="Phone Number"
          onChange={(e) => { setPersonalNumber(Number(e.target.value)); }}
        />
      </Grid>
      <Button
        variant="outlined"
        color="primary"
        size="medium"
        onClick={() => {
          handleNext();
          setCounter(2);
          personalInformationSubmit();
        }}
      >
        Next
      </Button>
    </Grid>
  );
};
export default Personal;
