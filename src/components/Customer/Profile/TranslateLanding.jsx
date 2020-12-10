import React, { useEffect, useState } from 'react';
import {
  makeStyles, Grid, Typography, Button, ButtonGroup,
} from '@material-ui/core';
import axios from 'axios';
import { getMenu } from '../../../helpers/menu';
import SearchOrder from './SearchOrder.jsx';
import Translate from './Translate.jsx';

const useStyles = makeStyles(() => ({
  parent: {
    border: 'solid 1px #4e71cc',
    borderRadius: '3px',
  },
  container: {
    margin: '5px 0 0 0',
  },
  backBtn: {
    opacity: '60%',
  },
}));

export default function TranslateLanding({ setView, customerId }) {
  const classes = useStyles();
  const [list, setList] = useState([]);
  const [menus, setMenus] = useState(null);
  const [order, setOrder] = useState({});
  const [displayOrder, setDisplayOrder] = useState('');
  const [pref, setPref] = useState('en');
  const [menuLang, setMenuLang] = useState('');
  const [start, setStart] = useState(false);
  const [manual, setManual] = useState(false);
  const [manualOrder, setManualOrder] = useState('');

  const translateOrder = () => {
    const newOrder = [];
    let orderStr = '';
    let lang = '';
    for (const key in order) {
      if (order[key]) {
        newOrder.push(key);
      }
    }

    if (newOrder.length > 0) {
      orderStr = newOrder.join(',');
      lang = menuLang;
    } else {
      orderStr = manualOrder;
      lang = pref;
    }
    axios.get('/api/translate', {
      params: {
        text: orderStr,
        target: lang,
      },
    })
      .then(({ data }) => {
        setDisplayOrder(data[0]);
      })
      .catch((err) => console.warn(err));
  };
  const clearOrder = () => {
    setOrder({});
    setDisplayOrder('');
    setMenus(null);
    setManualOrder('');
  };

  const handleChange = (event) => {
    getMenu(event.target.value, process.env.REDIRECT)
      .then(([results]) => {
        const arr = JSON.parse(results.info);
        if (arr) {
          setMenus(arr);
          setMenuLang(results.lang);
        } else {
          setMenus(null);
          setMenuLang('');
        }
      })
      .catch((err) => {
        console.warn(err);
      });
  };
  useEffect(() => {
    axios.get('/db/menu/allbars')
      .then(({ data }) => setList(data))
      .catch((err) => console.warn(err));
  }, []);

  return (
    <Grid>
      <Grid>
        <ButtonGroup size="small" aria-label="small outlined button group">
          <Button onClick={() => {
            setStart(true);
            setManual(false);
            clearOrder();
          }}
          >
            Search Available Menus
          </Button>
          <Button onClick={() => {
            setStart(true);
            setManual(true);
            clearOrder();
          }}
          >
            Manual Entry
          </Button>
        </ButtonGroup>
      </Grid>
      {start && (
      <span>
        {manual
          ? <Translate classes={classes} setPref={setPref} setManualOrder={setManualOrder} clearOrder={clearOrder} displayOrder={displayOrder} translateOrder={translateOrder} />
          : <SearchOrder menus={menus} pref={pref} setPref={setPref} handleChange={handleChange} list={list} classes={classes} order={order} />}
        <Grid>
          <ButtonGroup size="small" aria-label="small outlined button group">
            <Button onClick={clearOrder} variant="outlined" color="secondary">Clear Order</Button>
            <Button onClick={translateOrder} variant="contained" color="primary">Translate Order</Button>
          </ButtonGroup>
        </Grid>
        <Grid
          item
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Typography variant="subtitle1">
            Translated Order:
          </Typography>
          <Grid
            item
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            {displayOrder && (
            <Grid
              item
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Typography variant="subtitle1">
                {displayOrder}
              </Typography>
            </Grid>
            )}
          </Grid>
        </Grid>
      </span>
      )}
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
}
