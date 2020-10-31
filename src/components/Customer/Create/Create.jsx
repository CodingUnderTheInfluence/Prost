import React from 'react';
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

const useStyles = makeStyles({
  root: {
    border: 'solid black 1px',
    padding: '10px',
    margin: '5px 0 5px 0'
  }
});

const Create = () => {
  const classes = useStyles();
  return (
    <div>
        <FormControl fullWidth className={classes.root}>
          <Grid item container direction='row' className={classes.root}>
           <TextField id="standard-basic" label="Search" />
          </Grid>
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