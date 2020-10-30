import React from 'react';
import usePlacesAutocomplete, { getUrl } from 'use-places-autocomplete';
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

const BarInfo = ({placeInfo}) => {
  const classes = useStyles();
  const { title, time } = classes;
  return (
    placeInfo 
    ? <Card>
          <CardMedia 
            image={placeInfo.photos[0].getUrl({'maxWidth': 100, 'maxHeight': 100})}
            />
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
      : <></>
  )
};


// const BarInfo = () => {
//   return (
//     <Card>
//       <CardMedia 
//         // image={placeInfo.photos[0]}
//       />
//       <CardContent>
//         <Typography>
          
//         </Typography>
//       </CardContent>
//     </Card> 
      
//   )
// };

export default BarInfo;