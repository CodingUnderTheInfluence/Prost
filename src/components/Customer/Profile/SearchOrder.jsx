import React from 'react';
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
  return (
    <span>
      <Grid>
        <Typography>
          Preferred Language
        </Typography>
        <Language setPref={setPref} />
      </Grid>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Bars</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value="bar"
          onChange={handleChange}
        >
          {list.map((barObj, key) => <MenuItem key={key} value={barObj.id}>{barObj.bar_name}</MenuItem>)}
        </Select>
      </FormControl>
      <Grid>
        Menu
        {menus && menus.map((obj, key) => <Menu order={order} obj={obj} key={key} pref={pref} />)}
      </Grid>
    </span>
  );
}

SearchOrder.propTypes = propTypes.any;
