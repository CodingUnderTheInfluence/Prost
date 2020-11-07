import React, { useState } from 'react';
import {
  Grid,
  Button,
  FormControl,
  Card,
  CardContent,
  CardActions,
  Typography,
  CardMedia,
  IconButton,
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
    <Card>

    </Card>
  );
};

export default Create;

//
  // <div>
    //   {!party ? (
    //     <FormControl fullWidth className={classes.root}>
    //       <TextField
    //         id="standard-basic"
    //         label="Search"
    //         value={search}
    //         onChange={(e) => setSearch(e.target.value)}
    //       />
    //       <Grid item container direction="row">
    //         <TextField
    //           id="standard-number"
    //           label="Size"
    //           type="number"
    //           InputProps={{ inputProps: { min: 0, max: 10 } }}
    //           InputLabelProps={{
    //             shrink: true,
    //           }}
    //           value={size}
    //           onChange={(e) => setSize(e.target.value)}
    //         />
    //         {/* TODO: */}
    //         {/* <TextField id="standard-basic" label="First Name" />
    //         <TextField id="standard-basic" label="Last Name" /> */}
    //       </Grid>
    //       <Button
    //         variant="outlined"
    //         onClick={() => {
    //           handleParty();
    //           setSearch('');
    //           setSize('');
    //         }}
    //       >
    //         Submit
    //       </Button>

    //     </FormControl>
    //   )
    //     : <h1>Party Created!</h1>}
    // </div>
    // TODO:
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

/// ///////////////////////////////////        get bar info        ////////////////////////////////////////

// const storeBar = () => {
//   axios.get(`/db/bar/create?bar_name=${search}`)
//     .then(({data}) => {
//       if (data) {
//         console.info(data[0].id);
//       }
//     })
// }
