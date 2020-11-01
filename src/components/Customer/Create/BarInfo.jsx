import React, { useState } from 'react';
import createParty from '../../../helpers/createParty.js';
import usePlacesAutocomplete, { getUrl } from 'use-places-autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Card, 
  CardContent,
  Typography,
  CardMedia,
  Button,
  CardActions
} from '@material-ui/core';

const useStyles = makeStyles({
  title: {
    fontSize: '3em'
  },
  time: {
    fontSize: '1em'
  },
  phone: {
    fontSize: '1.5em'
  }
});
const searchStyle = {
  position: 'fixed', 
  zIndex: 2,
  padding: '50px',
};

const BarInfo = ({placeInfo, searchMarker}) => {
  const [ show, setShow ] = useState(true);
  const { photos, title, time, } = placeInfo;
  const photo = photos[0].getUrl();
  const classes = useStyles();

  return (
  <>
    {show ? <div style={searchStyle}>
      <Card>
        <CardMedia> 
          <img src={photo} style={{width: 300, alignItems: 'center'}} />
        </CardMedia>
        <CardContent>
          <Typography className={classes.title} variant='h4' con={console.log(placeInfo)}>
            {placeInfo.name}
          </Typography>
          <Typography className={classes.phone} component='p'>
            {placeInfo.formatted_phone_number}
          </Typography>
          {placeInfo.opening_hours !== undefined
            ? placeInfo.opening_hours.weekday_text.map(day => (
                <Typography className={classes.time} component='p'>{day}</Typography>
              ))
            : <Typography className={classes.time} component='p'>no info avaiable</Typography>
          }
        </CardContent>
        <CardActions>
          <Button 
            onClick={() => setShow(false)}
          >
            Close
          </Button>
          <Button 
            style={{float: 'right'}}
            onClick={() => createParty(placeInfo)}
          >
            Create Party
          </Button>
        </CardActions>
      </Card>
    </div>
    : null}
  </>
  );
};

export default BarInfo;