import React, { useState } from 'react';
import {
  Grid,
  Button,
  FormControl,
  Card,
  TextField,
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

const Create = ({ placeInfo }) => {
  const [size, setSize] = useState(1);
  const [party, setParty] = useState(false);
  const handleParty = () => {
    console.info(placeInfo)
    createParty(placeInfo, size)
      .then(() => {
        setParty(true);
      })
      .catch((err) => console.warn('error in party create', err));
  };
  const classes = useStyles();

  return (
    <div>
      {!party ?
        <FormControl>
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
          <Button
            variant="outlined"
            onClick={() => {
              handleParty();
              // setSearch('');
              setSize('');
            }}
          >
            Submit
          </Button>
        </FormControl>
        : <div>Party Created!</div>
      }
    </div>
  );
};

// TODO:
/// ///////////////////////////////////        get bar info        ////////////////////////////////////////
// const storeBar = () => {
//   axios.get(`/db/bar/create?bar_name=${search}`)
//     .then(({data}) => {
//       if (data) {
//         console.info(data[0].id);
//       }
//     })
// }
export default Create;
