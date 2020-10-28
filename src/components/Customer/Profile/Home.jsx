import React, {useState, useEffect, useLayoutEffect} from 'react';
import { Grid, Typography, Button } from '@material-ui/core'

export default function Home({setView}) {
  const [data, setData] = useState(false);

  useLayoutEffect(() => {
    fetch(`${process.env.REDIRECT}/db/customer`, {
      method: 'GET',
      // headers: {
      //   'Content-Type': 'application/json',
      // },
      // body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data[0]); // arr
      setData(data[0])
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }, []);

return (
  <Grid container direction="column" justify="center" alignItems="center">
      <Grid item container direction="row" justify="center" alignItems="center">
          <img src="https://i.imgur.com/jRnsxbB.png" style={{ height: '100px', width: '100px' }} />
      </Grid>
      <Grid item container direction="row" justify="center" alignItems="center">
          <Typography variant="subtitle1">
              @{data.user_name}
          </Typography>
      </Grid>
      <Button variant="outlined" color="primary" onClick={()=> setView('Favorite')}>
          Favorite Spots
      </Button>
      <Button variant="outlined" color="primary" onClick={()=> setView('EContact')}>
          Emergency Contact
      </Button>
      <Button variant="outlined" color="primary" onClick={()=> setView('Checkin')}>
          Check in
      </Button>
      <Button variant="outlined" color="primary" onClick={()=> setView('History')}>
          History
      </Button>
      <Button variant="outlined" color="primary" onClick={()=> setView('Translate')}>
          Translate
      </Button>
      <Button variant="outlined" color="primary" href={'/auth/logout'}>
          Logout
      </Button>
  </Grid>
)
}