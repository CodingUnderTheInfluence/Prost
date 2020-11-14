import React from 'react';
import {
  Grid,
  Button,
  Typography,
  TextField,
  makeStyles,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

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

const Emergency = ({
  setEmFirst,
  setEmLast,
  setEmNumber,
  setEmEmail,
  eContactInformationSubmit,
  handleBack,
  setCounter,
}) => {
  const classes = useStyles();
  const history = useHistory();
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
      >
        <Typography variant="subtitle1">
          Emergency Contact
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
          label="First Name"
          onChange={(e) => {
            setEmFirst(e.target.value);
          }}
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
          onChange={(e) => {
            setEmLast(e.target.value);
          }}
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
          label="Email"
          onChange={(e) => { setEmEmail(e.target.value); }}
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
          onChange={(e) => {
            setEmNumber(Number(e.target.value));
          }}
        />
      </Grid>
      <Button
        variant="contained"
        color="primary"
        size="medium"
        onClick={() => {
          eContactInformationSubmit();
          history.push('/customer');
        }}
      >
        Submit
      </Button>
    </Grid>
  );
};

export default Emergency;
