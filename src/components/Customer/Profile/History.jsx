import React, {useState, useEffect, useLayoutEffect} from 'react';
import { Grid, Typography, Button } from '@material-ui/core'


export default function History({setView}) {
  return(
    <div>
      <Button variant="outlined" color="primary" onClick={()=> setView('Home')}>
      Back
      </Button>
      Hello from History 
      </div>
    )
}