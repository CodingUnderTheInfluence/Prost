import React from 'react';
import {
  Grid,
  Typography,
  Button,
  TextField,
} from '@material-ui/core';
import propTypes from 'prop-types';
import Language from './Language.jsx';

export default function Translate({
  setPref, setManualOrder, classes,
}) {
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
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.parent}
      >
        <Grid
          item
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Typography variant="subtitle1">
            Target Language
          </Typography>
        </Grid>
        <Grid
          item
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Language setPref={setPref} />
        </Grid>
        <Grid
          item
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.container}
        >
          <Grid
            item
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <TextField
              id="outlined-basic"
              label="Item to translate"
              variant="outlined"
              size="small"
              placeholder="type here"
              onChange={(e) => {
                setManualOrder(e.target.value);
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

Translate.propTypes = propTypes.any;
