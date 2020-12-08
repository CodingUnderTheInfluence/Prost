import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { FormGroup, FormControlLabel, Switch } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  privateSwitch: {
    position: 'fixed',
    top: '80%',
    left: '10%',
    zIndex: 3,
  },
});

const PrivateSwitch = ({ gId, getSwitch }) => {
  const [isPrivate, setPrivate] = useState(false);
  const classes = useStyles();

  const handleChange = () => {
    setPrivate(!isPrivate);
    axios.put(`/db/customer/location/${gId}`, { isPrivate })
      .then(() => getSwitch(isPrivate))
      .catch(() => console.warn('error in private switch'));
  };

  return (
    <FormGroup className={classes.privateSwitch}>
      <FormControlLabel
        color="primary"
        control={<Switch checked={isPrivate} onChange={handleChange} />}
      />
    </FormGroup>
  );
};

PrivateSwitch.propTypes = {
  getSwitch: PropTypes.func.isRequired,
  gId: PropTypes.string,
};

export default PrivateSwitch;
