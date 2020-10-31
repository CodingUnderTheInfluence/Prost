import React, {useState, useEffect, useLayoutEffect} from 'react';
import { Grid, Typography, Button } from '@material-ui/core'


export default function HistoryList({ list }) {
  const [data, setData] = useState(null);

  return(
    <div>
      <p>{list.bar_name}</p>
      <p>{list.address}</p> 
      <p>{list.phone_number}</p> 
    </div>
  )
}