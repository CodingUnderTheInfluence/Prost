import React from 'react';
import {
  Grid,
  Typography,
  Button,
  TextField,
  ButtonGroup,
  makeStyles,
} from '@material-ui/core';
import propTypes from 'prop-types';
import Language from './Language.jsx';

export default function Translate({
  setPref, setManualOrder, clearOrder, displayOrder, translateOrder, classes,
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
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Typography variant="h4">
          Translator
        </Typography>
      </Grid>
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
        {/* <Grid
          item
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.container}
        >
          <ButtonGroup size="small" aria-label="small outlined button group">
            <Button onClick={clearOrder} variant="outlined" color="secondary">Clear Order</Button>
            <Button onClick={translateOrder} variant="contained" color="primary">Translate Order</Button>
          </ButtonGroup>
        </Grid> */}
        {/* <Grid
          item
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Typography variant="subtitle1">
            Translated Order:
          </Typography>
          <Grid
            item
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            {displayOrder && (
            <Grid
              item
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Typography variant="subtitle1">
                {displayOrder}
              </Typography>
            </Grid>
            )}
          </Grid>
        </Grid> */}
      </Grid>
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
}

Translate.propTypes = propTypes.any;
