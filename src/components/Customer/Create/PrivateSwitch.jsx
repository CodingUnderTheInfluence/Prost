import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { FormGroup, FormControlLabel, Switch, Fab } from '@material-ui/core';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  privateSwitch: {
    position: 'fixed',
    top: '74%',
    left: '85%',
    zIndex: 3,
  },
});

const PrivateSwitch = ({ gId, getSwitch }) => {
  const [isPrivate, setPrivate] = useState(JSON.parse(localStorage.isPrivate));
  const classes = useStyles();
  const handleChange = () => {
    setPrivate(!isPrivate);
    localStorage.isPrivate = isPrivate;
    console.log('is private switch', isPrivate)
    axios.put(`/db/customer/location/${gId}`, { isPrivate })
      .then(() => getSwitch(isPrivate))
      .catch(() => console.warn('error in private switch'));
  };

  return (
    // <FormGroup className={classes.privateSwitch}>
    //   <FormControlLabel
    //     color="primary"
    //     control={<Switch checked={isPrivate} onChange={handleChange} />}
    //   />
    // </FormGroup>
    <Fab
      className={classes.privateSwitch}
      size="small"
      color="primary"
      onClick={handleChange}
    >
      <VisibilityOffIcon />
    </Fab>
  );
};

PrivateSwitch.propTypes = {
  getSwitch: PropTypes.func.isRequired,
  gId: PropTypes.string,
};

export default PrivateSwitch;
