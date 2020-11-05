import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import DeleteIcon from '@material-ui/icons/Delete';

export default function CheckinList({ customerId }) {
  const [list, setList] = useState([]);
  const getList = () => {
    fetch(`/db/cb/checkin/${customerId}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        data.length > 0 ? setList(data) : setList([]);
      })
      .catch((err) => console.warn(err));
  };

  const checkout = async (num) => {
    try {
      const obj = {
        id_bar: num,
        id_customer: customerId,
      };
      const result = await fetch('/db/cb/checkout', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      });
      getList();
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    getList();
  });

  return (
    <Grid item xs={12} md={6}>
      <Typography variant="h6">
        Places
      </Typography>
      <div>
        {list ? (
          <List>
            {list && list.map((bar, key) => (
              <ListItem key={key}>
                <ListItemText
                  primary={bar.bar_name}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon onClick={() => checkout(bar.id)} />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )
          : <Skeleton animation="wave" styles={{ width: '300' }} />}
      </div>
    </Grid>
  );
}
