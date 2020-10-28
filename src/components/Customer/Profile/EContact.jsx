import React, {useState, useEffect, useLayoutEffect} from 'react';
import { Grid, Typography, Button } from '@material-ui/core'


export default function EContact({setView}) {
  return(
    <div>
      <Button variant="outlined" color="primary" onClick={()=> setView('Home')}>
      Back
      </Button>
      Hello from EContact 
      </div>
    )
}