import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { FormGroup, FormControlLabel, Switch } from '@material-ui/core';

const PrivateSwitch = ({ gId, getSwitch }) => {
  const [isPrivate, setPrivate] = useState(false);

  const handleChange = (e) => {
    setPrivate(e.target.checked);
    getSwitch(isPrivate);
    axios.put(`/db/maps/${gId}`, { isPrivate: e.target.checked })
      .then(data => console.info('axios.put', data));
  };

  return (
    <FormGroup>
      <FormControlLabel
        color='primary'
        control={<Switch checked={isPrivate} onChange={handleChange} />}
        label='Private'
      />
    </FormGroup>
  );
};

PrivateSwitch.propTypes = {
  getSwitch: PropTypes.func.isRequired,
  gId: PropTypes.string.isRequired,
};

export default PrivateSwitch;
