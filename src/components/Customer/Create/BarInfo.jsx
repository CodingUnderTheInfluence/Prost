import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import usePlacesAutocomplete, { getUrl } from 'use-places-autocomplete';
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
<<<<<<< HEAD
=======
import Create from './Create.jsx';
>>>>>>> fc5b09a... (Bug) crashes when sign in error in unmounted component map2

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
  const [showCreate, setShowCreate] = useState(true);
  const [atBar, setAtBar] = useState(false);
  const { photos, name, formatted_phone_number, title } = placeInfo;
  const photo = photos[0].getUrl();
  const classes = useStyles();

  return (
    <>
      {show && (
        <div style={searchStyle}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              title={`${placeInfo.name} photo`}
              image={photo}
            />
            <CardContent>
              <Typography className={classes.title} variant="h4" con={console.info(placeInfo)}>
                {name}
              </Typography>
              <Typography className={classes.phone} component="p">
                {formatted_phone_number}
              </Typography>
              {placeInfo.opening_hours.length
                ? placeInfo.opening_hours.weekday_text.map((day, i) => (
                  <Typography className={classes.time} key={i} component="p">{day}</Typography>
                ))
                : <Typography className={classes.time} component="p">no info avaiable</Typography>}
            </CardContent>
            <CardActions>
              <Button
                onClick={() => setShow(!show)}
              >
                Close
              </Button>
<<<<<<< HEAD
              {/* <Button
            style={{float: 'right'}}
            onClick={() => createParty(placeInfo)}
          >
          Create Party
        </Button> */}
=======
              <Button
                onClick={() => {
                  setShowCreate(!showCreate);
                  setShow(!show);
                  console.log(showCreate)
                }}
              >
                Create
              </Button>
>>>>>>> fc5b09a... (Bug) crashes when sign in error in unmounted component map2
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
      )}
      {/* {showCreate ? null : <Create />} */}
    </>
  );
};

BarInfo.propTypes = {
  placeInfo: PropTypes.func.isRequired,
};

// <img src={photo} style={{width: 300, height: 200, alignItems: 'center'}} />

export default BarInfo;
