import React, { useState } from 'react';
import axios from 'axios';
import {
  Grid,
  Button,
  Typography,
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import createParty from '../../../helpers/createParty';

const useStyles = makeStyles({
  root: {
    border: 'solid black 1px',
    padding: '10px',
    margin: '5px 0 5px 0',
  },
});

const Create = () => {
  const [search, setSearch] = useState('');
  const [size, setSize] = useState(1);
  const [party, setParty] = useState(false);
  const handleParty = () => {
    createParty(search, size)
      .then(() => {
        setParty(true);
      })
      .catch((err) => console.warn('error in party create', err));
  };
  const classes = useStyles();

  return (
    <div>
      {!party ? (
        <FormControl fullWidth className={classes.root}>
          <TextField
            id="standard-basic"
            label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Grid item container direction="row">
            <TextField
              id="standard-number"
              label="Size"
              type="number"
              InputProps={{ inputProps: { min: 0, max: 10 } }}
              InputLabelProps={{
                shrink: true,
              }}
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
            {/* <TextField id="standard-basic" label="First Name" />
            <TextField id="standard-basic" label="Last Name" /> */}
          </Grid>
          <Button
            variant="outlined"
            onClick={() => {
              handleParty();
              setSearch('');
              setSize('');
            }}
          >
            Submit
          </Button>

        </FormControl>
      )
        : <h1>Party Created!</h1>}
    </div>

    // <>
    //   <FormControl>
    //     <Grid item container direction='row' className={classes.root}>
    //       <TextField id="standard-basic" label="Search" />
    //     </Grid>
    //   </FormControl>
    //   <Grid item container direction="row" className={classes.root}>
    //     <TextField id="standard-basic" label="First Name" />
    //     <TextField id="standard-basic" label="Last Name" />
    //   </Grid>
    // </>
  );
};

// const QuickCreate = () => {

//     function success(pos) {
//       var crd = pos.coords;

//       console.log('Your current position is:');
//       console.log(`Latitude : ${crd.latitude}`);
//       console.log(`Longitude: ${crd.longitude}`);
//       console.log(`More or less ${crd.accuracy} meters.`);
//     }

//     function error(err) {
//       console.warn(`ERROR(${err.code}): ${err.message}`);
//     }

//     const handleClick = () => {
//       navigator.geolocation.getCurrentPosition(success, error);
//     };

//       return (
//         <button onClick={handleClick}>I'm drinking!</button>
//       );
//     };

export default Create;

/// ///////////////////////////////////        get bar info        ////////////////////////////////////////

// const storeBar = () => {
//   axios.get(`/db/bar/create?bar_name=${search}`)
//     .then(({data}) => {
//       if (data) {
//         console.log(data[0].id);
//       }
//     })
// }
