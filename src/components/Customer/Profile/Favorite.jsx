import React, {useState, useEffect, useLayoutEffect} from 'react';
import { Grid, Typography, Button } from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import HistoryList from './HistoryList.jsx'

export default function Favorite({setView, customerId}) {
  const [list, setList] = useState(null);
  const getData = () => {
    fetch(`${process.env.REDIRECT}/db/cb/favorite/${customerId}`, {
      method: 'GET',
    })
    .then(response => response.json())
    .then(res => {
      console.log('Contact Success :', res)
      setList(res);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  useEffect(() => {
    getData();
  }, []);

  return(
    <div>
      <ArrowBackIosIcon color="primary" onClick={()=> setView('Home')} />
      Hello from Favorite
      {list && (list.map((bar, key) => 
        <div key={key}>
        <p>{bar.bar_name}</p>
        <p>{bar.address}</p> 
        <p>{bar.phone_number}</p> 
      </div>
      ))} 
    </div>
  )
}