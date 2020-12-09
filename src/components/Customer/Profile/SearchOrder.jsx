import React, { useState } from 'react';
import {
  Grid,
  Typography,
  InputLabel,
  makeStyles,
  MenuItem,
  FormControl,
  Select,
} from '@material-ui/core';
import propTypes from 'prop-types';

import Language from './Language.jsx';
import Menu from './Menu.jsx';

export default function SearchOrder({
  menus, setPref, handleChange, list, classes, order, pref,
}) {
  const [selectedBar, setSelectedBar] = useState('');
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
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Bars</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedBar}
                onChange={(e) => {
                  handleChange(e);
                  setSelectedBar(e.target.value);
                }}
              >
                {list.map((barObj, key) => <MenuItem key={key} value={barObj.id}>{barObj.bar_name}</MenuItem>)}
              </Select>
            </FormControl>
            <Grid>
              Menu
              {menus && menus.map((obj, key) => <Menu order={order} obj={obj} key={key} pref={pref} />)}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

SearchOrder.propTypes = propTypes.any;
