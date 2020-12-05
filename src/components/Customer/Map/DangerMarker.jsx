import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Marker, InfoWindow, Data } from '@react-google-maps/api';
import {
  Grid,
  MenuItem,
  IconButton,
  TextField
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import axios from 'axios';
import warning from '../../../../images/warning.png';

const reports = ['Theft', 'Assault', 'Shooting'];

const DangerMarker = ({ danger, getDblClickDangerMarker }) => {
  const { lat, lng } = danger;
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState('Assault');
  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    event.preventDefault();
    setSelected(event.target.value);
  };

  const handleDblClick = () => getDblClickDangerMarker(danger);

  const postReport = () => {
    axios.post('/db/maps/report', {
      latitude: lat,
      longitude: lng,
      report: selected,
    })
      .then(() => {
        setSuccess(true);
      })
      .catch((err) => console.warn(err));
  };

  const handleClick = () => {
    setShow(!show);
  };
  return (
    <Marker
      position={{ lat, lng }}
      onClick={handleClick}
      onDblClick={handleDblClick}
      icon={{
        url: warning,
      }}
    >
      <InfoWindow>
        {success ? (<h3>{`${selected} Reported!`}</h3>) : (
          <Grid>
            <TextField
              select
              value={selected}
              helperText="Report Crime"
              onChange={handleChange}
            >
              {reports.map((report) => (
                <MenuItem
                  key={report}
                  value={report}
                >
                  {report}
                </MenuItem>
              ))}
            </TextField>
            <IconButton
              aria-label="send"
              onClick={postReport}
            >
              <SendIcon />
            </IconButton>
          </Grid>
        )}
      </InfoWindow>
    </Marker>
  );
};

DangerMarker.propTypes = {
  allDanger: propTypes.any,
  danger: propTypes.shape({
    lat: propTypes.number,
    lng: propTypes.number,
  }),
};

export default DangerMarker;
