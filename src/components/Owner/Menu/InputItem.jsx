import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Select,
  FormControl,
  MenuItem,
} from '@material-ui/core';
import propTypes from 'prop-types';
import { addItem } from '../../../helpers/menu';

export default function InputItem({
  barId, reload,
}) {
  const [inputItem, setInputItem] = useState('');
  const [selected, setSelected] = useState('');

  const handleChange = (event) => {
    setSelected(event.target.value);
  };
  useEffect(() => {
    reload(barId, process.env.REDIRECT);
  }, []);
  return (
    <FormControl>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selected}
        onChange={handleChange}
        placeholder="Type"
      >
        <MenuItem value="Food">Food</MenuItem>
        <MenuItem value="Drink">Drink</MenuItem>
      </Select>
      <TextField
        autoFocus
        margin="dense"
        id="item"
        label="Item"
        fullWidth
        value={inputItem}
        onChange={(e) => setInputItem(e.target.value)}
      />
      <Button
        color="primary"
        autoFocus
        onClick={() => {
          addItem(selected, inputItem, barId, process.env.REDIRECT)
            .then(() => {
              setInputItem('');
              reload(barId, process.env.REDIRECT);
            })
            .catch((err) => console.warn(err));
        }}
      >
        Add
      </Button>
    </FormControl>
  );
}

InputItem.propTypes = propTypes.any;
