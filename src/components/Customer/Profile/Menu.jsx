import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Accordion, AccordionSummary, AccordionDetails, Typography, Grid, FormControlLabel, Checkbox,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function Menu({ menuStr, order }) {
  const classes = useStyles();
  const [heading, setHeading] = useState('');
  const [body, setBody] = useState([]);

  const handlechange = (e, item) => {
    if(order.hasOwnProperty(item)){
      order[item] ? order[item] = false : order[item] = true
    } else {
      order[item] = true;
    }
    console.info(order);
  }

  useEffect(() => {
    console.info('FROM MENU JSX menuStr', menuStr);
    const arr = menuStr.split('\n');
    setHeading(arr[0]);
    arr.shift();
    console.info('FROM MENU JSX arr', arr);
    setBody(arr);
  }, [menuStr]);
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
        {body && body.map((item, key) => (
          <AccordionDetails key={key}>
            <FormControlLabel
              aria-label="menu"
              onClick={(event) => {
                event.stopPropagation()
                console.info('onClick', event.target)
              }}
              onFocus={(event) => {
                event.stopPropagation()
                console.info('onFocus', event.target)
              }}
              control={<Checkbox onChange={(e)=> handlechange(e, item)}/>}
              label={item}
            />
          </AccordionDetails>
        ))}
      </Accordion>
    </Grid>
  );
}
