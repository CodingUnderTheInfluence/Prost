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

export default function Menu({ menuStr }) {
  const classes = useStyles();
  const [heading, setHeading] = useState('');
  const [body, setBody] = useState([]);

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
              onClick={(event) => event.stopPropagation()}
              onFocus={(event) => event.stopPropagation()}
              control={<Checkbox />}
              label={item}
            />
          </AccordionDetails>
        ))}
      </Accordion>
    </Grid>
  );
}
