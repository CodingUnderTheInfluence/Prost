import React, {useState, useEffect, useLayoutEffect} from 'react';
import { Grid, Typography, Button } from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import DeleteOutlinedIcon from  '@material-ui/icons/DeleteOutlined'
import HistoryList from './HistoryList.jsx'

export default function Friend({setView, customerId}) {
  const [list, setList] = useState(null);
  const getData = () => {
    fetch(`/db/friendship/all/friends/${customerId}`, {
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
  const deleteFriend = async (num) => {
    try {
      const obj = {
        id_bar: num,
        id_customer: customerId
      }
      const result = await fetch(`/db/cb/delete/Friend`, {
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
      Hello from Friend
      {list && (list.map((friend, key) => 
        <div key={key}>
        <p>{friend.user_name}</p>
        {/* <DeleteOutlinedIcon onClick={() => deleteFriend(friend.id)}/> */}
      </div>
      ))} 
    </div>
  )
}