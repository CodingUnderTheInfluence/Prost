import React, { useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  Button,
  TextField,
  ButtonGroup,
  makeStyles,
  Select,
} from '@material-ui/core';
import axios from 'axios';
import Menu from './Menu.jsx';
import Language from './Language.jsx';

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

export default function Translate({ setView, customerId }) {
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

  const getMenu = (id) => {
    axios.get(`/db/menu/bar/${id}`)
      .then(({ data }) => {
        if (data.length > 0) {
          setMenus(data[0].info.split('&'));
          setMenuLang(data[0].lang);
        } else {
          setMenus(null);
          setMenuLang('');
        }
      })
      .catch((err) => console.warn(err));
  };

  const handleChange = (event) => {
    getMenu(event.target.value);
  };

  useEffect(() => {
    axios.get('/db/menu/allbars')
      .then(({ data }) => setList(data))
      .catch((err) => console.warn(err));
  }, []);

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Typography variant="h4">
          Translator
        </Typography>
      </Grid>
      <Grid
        item
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.parent}
      >
        <Grid
          item
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Typography variant="subtitle1">
            Target Language
          </Typography>
        </Grid>
        <Grid
          item
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Language setPref={setPref} />
        </Grid>
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
            <TextField
              id="outlined-basic"
              label="Item to translate"
              variant="outlined"
              size="small"
              placeholder="type here"
              onChange={(e) => {
                setManualOrder(e.target.value);
              }}
            />
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.container}
        >
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
      </Grid>
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
