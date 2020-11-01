import React from 'react';
import { InfoWindow } from '@react-google-maps/api';
// import usePlacesAutocomplete, { getUrl } from 'use-places-autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Card, 
  CardContent,
  Typography,
  CardMedia
} from '@material-ui/core';

const useStyles = makeStyles({
  title: {
    fontSize: 20
  },
  time: {
    fontSize: 10
  }
});

const BarInfo = ({placeInfo, searchMarker}) => {
  const { photos, title, time } = placeInfo;
  const photo = photos[0].getUrl();
  const classes = useStyles();
  return (

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
    </Card>
    // <InfoWindow
    //   position={{
    //     lat: +searchMarker.lat, 
    //     lng: +searchMarker.lng
    //   }}
    // >
    //   <div>
    //     <img src={photo} width='300'/>
    //   </div>
    // </InfoWindow>
  )
};

    // placeInfo 
    // ? <Card>
    //       <CardMedia 
    //         image={placeInfo.photos[0].getUrl({'maxWidth': 100, 'maxHeight': 100})}
    //         />
    //       <CardContent>
    //         <Typography className={title} variant='h4'>
    //           {placeInfo.name}
    //         </Typography>
    //         {placeInfo.opening_hours !== undefined
    //           ? placeInfo.opening_hours.weekday_text.map(day => (
    //               <Typography className={time} component='p'>{day}</Typography>
    //             ))
    //           : <Typography className={time} component='p'>no info avaiable</Typography>
    //         }
    //       </CardContent>
    //     </Card> 
    //   : <></>

export default BarInfo;