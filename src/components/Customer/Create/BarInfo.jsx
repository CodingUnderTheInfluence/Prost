import React, { useState } from 'react';
import usePlacesAutocomplete, { getUrl } from 'use-places-autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  CardMedia,
  Button,
  IconButton,
} from '@material-ui/core';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import createParty from '../../../helpers/createParty.js';

const useStyles = makeStyles({
  title: {
    fontSize: '3em',
  },
  time: {
    fontSize: '1em',
  },
  phone: {
    fontSize: '1.5em',
  },
});

const searchStyle = {
  position: 'fixed',
  zIndex: 2,
  padding: '50px',
};

const BarInfo = ({ placeInfo, searchMarker }) => {
  const [show, setShow] = useState(true);
  const [atBar, setAtBar] = useState(false);
  const { photos, title, time } = placeInfo;
  const photo = photos[0].getUrl();
  const classes = useStyles();

  return (
    <>
      {show ? (
        <div style={searchStyle}>
          <Card>
            <CardMedia>
              <img src={photo} style={{ width: 300, height: 200, alignItems: 'center' }} />
            </CardMedia>
            <CardContent>
              <Typography className={classes.title} variant="h4" con={console.info(placeInfo)}>
                {placeInfo.name}
              </Typography>
              <Typography className={classes.phone} component="p">
                {placeInfo.formatted_phone_number}
              </Typography>
              {placeInfo.opening_hours !== undefined
                ? placeInfo.opening_hours.weekday_text.map((day) => (
                  <Typography className={classes.time} component="p">{day}</Typography>
                ))
                : <Typography className={classes.time} component="p">no info avaiable</Typography>}
            </CardContent>
            <CardActions>
              <Button
                onClick={() => setShow(false)}
              >
                Close
              </Button>
              {/* <Button
            style={{float: 'right'}}
            onClick={() => createParty(placeInfo)}
          >
          Create Party
        </Button> */}
              <IconButton
                aria-label="at bar"
                onClick={() => {
                  createParty(placeInfo);
                  setAtBar(!atBar);
                }}
              >
                {!atBar ? <LocalBarIcon /> : <LocalBarIcon color="secondary" />}
              </IconButton>
            </CardActions>
          </Card>
        </div>
      )
        : null}
    </>
  );
};

export default BarInfo;
