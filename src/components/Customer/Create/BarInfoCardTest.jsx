import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Card, 
  CardContent,
  Typography,
  CardMedia, 
  CardActions
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { results } from '../../data/places.json';


const useStyles = makeStyles({
  title: {
    fontSize: 20
  },
  time: {
    fontSize: 10
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 240,
  },

});

const BarCard = () => {
  const { name, photos, icon } = results[0];
  const classes = useStyles();
  return (
    // <div style={{display: 'flex', justifyContent: 'center', zIndex: 3}}>
      <Card>
        <CardMedia
          image='https://assets.simpleviewinc.com/simpleview/image/fetch/c_limit,q_80,w_1200/https://assets.simpleviewinc.com/simpleview/image/upload/crm/neworleans/68972_1148_08_753d27db-5056-b365-ab9a36a151fd7df9.jpg' 
          className={classes.media} />
        <CardContent>
          <Typography variant='h4'>
            {name}
          </Typography>
          <Typography component='p'>Monday 8am - 9pm </Typography>
          <Typography component='p'>Tuesday 8am - 9pm </Typography>
          <Typography component='p'>Wednesday 8am - 9pm </Typography>
          <Typography component='p'>Thursday 8am - 9pm </Typography>
          <Typography component='p'>Friday 8am - 9pm </Typography>
          <Typography component='p'>Saturday 8am - 9pm </Typography>
          <Typography component='p'>Sunday 8am - 9pm </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">save</Button>
        </CardActions>
      </Card>
    // </div>
  );
};

export default BarCard;