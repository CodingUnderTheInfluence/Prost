import React, {useState, useEffect, useLayoutEffect} from 'react';
import { Grid, Typography, Button } from '@material-ui/core'


export default function Favorite({setView}) {
  return(
    <div>
      <Button variant="outlined" color="primary" onClick={()=> setView('Home')}>
      Back
      </Button>
      Hello from Favorite 
      </div>
    )
}