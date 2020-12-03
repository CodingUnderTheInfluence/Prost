import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  TextField,
  Toolbar,
  AppBar,
  Select,
  FormControl,
  MenuItem,
  Accordion,
  Divider,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function InputItem() {
  const [inputItem, setInputItem] = useState('');
  const [selected, setSelected] = useState('');
  const addItem = () => {
    console.log(inputItem, selected);
    setInputItem('');
    setSelected('');
  };
  const handleChange = (event) => {
    setSelected(event.target.value);
  };
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
      <Button color="primary" autoFocus onClick={addItem}>
        Add
      </Button>
    </FormControl>
  );
}
