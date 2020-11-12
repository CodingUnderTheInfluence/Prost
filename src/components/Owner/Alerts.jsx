import React, { useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import AlertEntry from './AlertEntry.jsx';
import axios from 'axios';

const Alerts = ({ barId, customerList, count }) => {
  let blank;

  return (
    <div>
      {customerList.map((customer) => {
        return <AlertEntry customer={customer} barId={barId} count={count} />
      })}
    </div>
  );
};

export default Alerts;
