import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import HistoryList from './HistoryList.jsx';

const Favorite = ({ setView, customerId }) => {
  const [list, setList] = useState(null);
  const getData = () => {
    fetch(`/db/cb/favorite/${customerId}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((res) => {
        setList(res);
      })
      .catch((error) => {
        console.warn('Error:', error);
      });
  };
  const deleteFavorite = async (num) => {
    try {
      const obj = {
        id_bar: num,
        id_customer: customerId,
      };
      const result = await fetch('/db/cb/delete/favorite', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      });
      getData();
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (

    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item container direction="row" justify="center" alignItems="center">
        Favorites List
      </Grid>
      <Button
        color="primary"
        onClick={() => setView('Home')}
      >
        {list && (list.map((bar, key) => (
          <div key={key}>
            <Grid
              item
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid
                item
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                {bar.bar_name}
              </Grid>
              <Grid
                item
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                {bar.address}
              </Grid>
              <Grid
                item
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                {bar.phone_number}
              </Grid>
              <DeleteOutlinedIcon onClick={() => deleteFavorite(bar.id)} />
            </Grid>
          </div>
        )))}
      </Button>
    </Grid>

  );
};

export default Favorite;
