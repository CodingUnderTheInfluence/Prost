import React, {useState, useEffect, useLayoutEffect} from 'react';
import { Grid, Typography, Button } from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import HistoryList from './HistoryList.jsx'

export default function History({setView, customerId}) {
  const [list, setList] = useState(null);
  const getData = () => {
    fetch(`${process.env.REDIRECT}/db/cb/history/${customerId}`, {
      method: 'GET',
    })
    .then(response => response.json())
    .then(res => {
      const [result] = res;
      // console.log('Contact Success :', result)
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
      Hello from History
      {list && (list.map((bar, key) => 
        <HistoryList key={key} list={bar} />
      ))} 
    </div>
  )
}