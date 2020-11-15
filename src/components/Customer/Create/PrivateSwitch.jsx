import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { FormGroup, FormControlLabel, Switch } from '@material-ui/core';

const PrivateSwitch = ({ gId, getSwitch }) => {
  const [isPrivate, setPrivate] = useState(false);

  const handleChange = () => {
    setPrivate(!isPrivate);
    axios.put(`/db/maps/${gId}`, { isPrivate })
      .then(() => getSwitch(isPrivate))
      .catch(() => console.warn('error in private switch'));
  };

  return (
    <FormGroup>
      <FormControlLabel
        color="primary"
        control={<Switch checked={isPrivate} onChange={handleChange} />}
        label="Private"
      />
    </FormGroup>
  );
};

PrivateSwitch.propTypes = {
  getSwitch: PropTypes.func.isRequired,
  gId: PropTypes.string,
};

export default PrivateSwitch;
