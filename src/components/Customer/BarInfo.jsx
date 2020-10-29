import React from 'react';
import usePlacesAutocomplete, { getUrl } from 'use-places-autocomplete';
import { 
  Card, 
  CardContent,
  Typography,
  CardMedia
} from '@material-ui/core';

import { result } from './places.json';



const BarInfo = ({placeInfo}) => {
  return (
    placeInfo 
    ? <Card>
          <CardMedia 
            image={placeInfo.photos[0].getUrl({'maxWidth': 100, 'maxHeight': 100})}
            />
          <CardContent>
            <Typography>
              {placeInfo.name}
            </Typography>
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