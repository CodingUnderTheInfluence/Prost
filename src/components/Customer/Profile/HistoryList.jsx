import React, {useState, useEffect, useLayoutEffect} from 'react';
import { Grid, Typography, Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';


export default function HistoryList({ list, customerId }) {
  const addFavorite = async () => {
    try {
      const obj = {
        id_bar: list.id,
        id_customer: customerId
      }
      const result = await fetch(`${process.env.REDIRECT}/db/cb/add/favorite`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      })
      console.log(result);
    } catch (err) {
      console.error(err)
    }
  }

  return(
    <div>
      <p>{list.bar_name}</p>
      <p>{list.address}</p> 
      <p>{list.phone_number}</p> 
      <div>
        <AddIcon onClick={addFavorite}/>
      </div>
    </div>
  )
}