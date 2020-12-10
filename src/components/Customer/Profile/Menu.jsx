import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Accordion, AccordionSummary, AccordionDetails, Typography, Grid, FormControlLabel, Checkbox,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function Menu({ menuStr, order, pref }) {
  const classes = useStyles();
  const [heading, setHeading] = useState('');
  const [body, setBody] = useState([]);
  const [translate, setTranslate] = useState([]);

  const handlechange = (e, item) => {
    if (order.hasOwnProperty(item)) {
      order[item] ? order[item] = false : order[item] = true;
    } else {
      order[item] = true;
    }
  };

  const translateMenu = (array) => {
    const orderStr = array.join(',');
    axios.get('/api/translate', {
      params: {
        text: orderStr,
        target: pref,
      },
    })
      .then(({ data }) => setTranslate(data[0].split(',')))
      .catch((err) => console.warn(err));
  };

  useEffect(() => {
    const arr = menuStr.split('\n');
    setHeading(arr[0]);
    arr.shift();
    translateMenu(arr);
    setBody(arr);
  }, [menuStr, pref]);

  return (
    <Grid className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          aria-controls="additional-actions1-content"
          id="additional-actions1-header"
        >
          <Typography color="textPrimary">
            {heading}
          </Typography>
        </AccordionSummary>
        {body && body.map((item, index) => (
          <AccordionDetails key={index}>
            <FormControlLabel
              aria-label="menu"
              onClick={(event) => {
                event.stopPropagation();
              }}
              onFocus={(event) => {
                event.stopPropagation();
              }}
              control={<Checkbox onChange={(e) => handlechange(e, translate[index])} />}
              label={item}
            />
            <Grid>
              <Typography color="textSecondary">
                {translate[index]}
              </Typography>
            </Grid>
          </AccordionDetails>
        ))}
      </Accordion>
    </Grid>
  );
}
