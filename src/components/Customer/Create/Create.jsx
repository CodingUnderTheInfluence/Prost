import React, { useState } from 'react';
import axios from 'axios';
import { 
  Grid, 
  Button, 
  Typography, 
  TextField, 
  Radio, 
  RadioGroup, 
  FormControl, 
  FormControlLabel, 
  FormLabel, 
  InputLabel, 
  Input,
  InputAdornment 
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import storeBar from '../../../helpers/storeBar';

const useStyles = makeStyles({
  root: {
    border: 'solid black 1px',
    padding: '10px',
    margin: '5px 0 5px 0',
  }
});

const Create = () => {
  const [ search, setSearch ] = useState('');
  const [ size, setSize ] = useState(1);
  
  const storeBar = async () => {
    const bar = await axios.post(`/db/bar/create?bar_name=${search}`);
    const barId = bar.data[0].id;

    const party = await axios.post(`db/party/create?bar_id=${barId}`);
    console.log(party);
  };
  
  const classes = useStyles();

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
        <FormControl fullWidth className={classes.root}>
          <TextField id="standard-basic" value={search} label="Search" onChange={handleSearch} />
          <Grid item container direction='row'>
            <TextField
            id="standard-number"
            label="Size"
            type="number"
            InputProps={{ inputProps: { min: 0, max: 10 } }}
            InputLabelProps={{
              shrink: true,
            }}
          />
            {/* <TextField id="standard-basic" label="First Name" />
            <TextField id="standard-basic" label="Last Name" /> */}
          </Grid>
          <Button 
            variant="outlined" 
            onClick={() => {
              storeBar(search);
              setSearch('');
            }}>Submit</Button>

        </FormControl>
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
  )
}

const QuickCreate = () => {


    function success(pos) {
      var crd = pos.coords;
    
      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
    }
    
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    
    const handleClick = () => {
      navigator.geolocation.getCurrentPosition(success, error);
    };
    
    
      return (
        <button onClick={handleClick}>I'm drinking!</button>
      );
    };
    
export default Create;





////////////////////////////////////////        get bar info        ////////////////////////////////////////

// const storeBar = () => {
//   axios.get(`/db/bar/create?bar_name=${search}`)
//     .then(({data}) => {
//       if (data) {
//         console.log(data[0].id);
//       }
//     })
// };