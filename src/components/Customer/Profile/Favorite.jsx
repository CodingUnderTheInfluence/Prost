import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  Grid,
  Typography,
  Button,
  makeStyles,
  ButtonGroup,
} from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import PhoneIcon from '@material-ui/icons/Phone';

const useStyles = makeStyles({
  container: {
    border: 'solid 1px #4e71cc',
    borderRadius: '5px',
    margin: '5px 0 0 0 ',
    padding: '5px',
    width: '200px',
  },
  button: {
    variant: 'contained',
    color: 'primary',
    padding: '5px',
    margin: '10px 0 10px 0',
  },
  backBtn: {
    opacity: '60%',
  },
});

const Favorite = ({ setView, customerId }) => {
  const classes = useStyles();
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
        <Typography variant="h5">
          Favorites List
        </Typography>
      </Grid>
      {list && (list.map((bar, key) => (
        <div key={key}>
          <Grid
            item
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.container}
          >
            <Grid
              item
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Typography variant="subtitle1">
                {bar.bar_name}
              </Typography>
            </Grid>
            <Grid
              item
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <ButtonGroup>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  href={`tel:+1${bar.phone_number}`}
                >
                  <PhoneIcon />
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() => deleteFavorite(bar.id)}
                >
                  <DeleteOutlinedIcon />
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </div>
      )))}
      <Button
        size="small"
        color="primary"
        className={classes.backBtn}
        onClick={() => setView('Home')}
      >
        Back
      </Button>
    </Grid>
  );
};

export default Favorite;
