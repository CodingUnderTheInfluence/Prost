import React from 'react';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import DeleteIcon from '@material-ui/icons/Delete';

export default function CheckinList({ customerId, list, renderList }) {
  const checkout = async (num) => {
    try {
      const obj = {
        id_bar: num,
        id_customer: customerId,
      };
      await axios.delete('/db/cb/checkout', { data: obj });
      renderList();
    } catch (err) {
      console.warn(err);
    }
  };

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
