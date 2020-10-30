import React, {useState, useEffect, useLayoutEffect} from 'react';
import { Grid, Typography, Button } from '@material-ui/core'

export default function Home({setView, name, following, follower}) {

return (
  <Grid container direction="column" justify="center" alignItems="center">
      <Grid item container direction="row" justify="center" alignItems="center">
          <img src="https://i.imgur.com/jRnsxbB.png" style={{ height: '100px', width: '100px' }} />
      </Grid>
      <Grid item container direction="row" justify="center" alignItems="center">
          <Typography variant="subtitle1">
              @{name}
          </Typography>
      </Grid>
      <Grid>
          <span>{`${following}`}</span>
          {' '}
          <span onClick={()=> setView('Following')}>Following</span>
      </Grid>
      <Grid>
          <span>{`${follower}`}</span>
          {' '}
          <span onClick={()=> setView('Follower')}>Followers</span>
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