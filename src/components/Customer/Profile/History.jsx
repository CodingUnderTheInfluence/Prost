import React, {useState, useEffect, useLayoutEffect} from 'react';
import { Grid, Typography, Button } from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import HistoryList from './HistoryList.jsx'

export default function History({setView, customerId}) {
  const [list, setList] = useState(null);
  const getData = () => {
    fetch(`/db/cb/history/${customerId}`, {
      method: 'GET',
    })
    .then(response => response.json())
    .then(res => {
      // console.log('Contact Success :', res)
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
      Hello from History
      {list && (list.map((bar, key) => 
        <div>
          <HistoryList key={key} list={bar} customerId={customerId} s/>
          <hr key={`0${key}`}/>
        </div>
      ))} 
    </div>
  )
}