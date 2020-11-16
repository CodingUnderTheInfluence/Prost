import React, { useState } from 'react';
import { Fab } from '@material-ui/core';
import NavigationIcon from '@material-ui/icons/Navigation';
import Directions from './Directions.jsx';

const DirectionsBtn = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow(!show);
  };
  return (
    <div>
      <Fab
        className="directions"
        size="small"
        color="primary"
        onClick={handleClick}
      >
        <NavigationIcon />
      </Fab>
      { show && <Directions />}
      {/* <Directions /> */}
    </div>
  );
};
export default DirectionsBtn;
