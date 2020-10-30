import React, {useState, useEffect, useLayoutEffect} from 'react';
import { Grid, Typography, Button } from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import DeleteOutlinedIcon from  '@material-ui/icons/DeleteOutlined'
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
  const deleteFavorite = async (num) => {
    try {
      const obj = {
        id_bar: num,
        id_customer: customerId
      }
      const result = await fetch(`${process.env.REDIRECT}/db/cb/delete/favorite`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      })
      getData();
    } catch (err) {
      console.error(err)
    }
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
        <DeleteOutlinedIcon onClick={() => deleteFavorite(bar.id)}/>
      </div>
      ))} 
    </div>
  )
}