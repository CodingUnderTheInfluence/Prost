import React, { useState } from 'react';
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
    fontSize: 20
  },
  time: {
    fontSize: 10
  }
});
const searchStyle = {
  position: 'fixed', 
  zIndex: 2,
  padding: '50px',
};

const BarInfo = ({placeInfo, searchMarker}) => {
  const [ show, setShow ] = useState(true);
  const { photos, title, time } = placeInfo;
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
          <Typography className={title} variant='h4'>
            {placeInfo.name}
          </Typography>
          {placeInfo.opening_hours !== undefined
            ? placeInfo.opening_hours.weekday_text.map(day => (
                <Typography className={time} component='p'>{day}</Typography>
              ))
            : <Typography className={time} component='p'>no info avaiable</Typography>
          }
        </CardContent>
        <CardActions>
          <Button 
            onClick={() => setShow(false)}
          >
            close
          </Button>
        </CardActions>
      </Card>
    </div>
    : null}
  </>
  );
};

export default BarInfo;