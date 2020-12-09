import React from 'react';
import {
  Accordion, AccordionSummary, AccordionDetails, Typography, Grid, Button,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import propTypes from 'prop-types';
import { deleteItem } from '../../../helpers/menu';

export default function BarMenuList({ barId, loadedMenu, reload }) {
  const handleDelete = (item, heading) => {
    deleteItem(process.env.REDIRECT, item, barId, heading)
      .then(() => reload(barId, process.env.REDIRECT))
      .catch((err) => console.warn(err));
  };

  return (
    <>
      {loadedMenu && loadedMenu.map((obj, index) => {
        const heading = Object.keys(obj).toString();
        const items = obj[heading];
        return (
          <Accordion key={index}>
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
            <Grid item xs={12} md={6}>
              {items && items.map((item, i) => (
                <AccordionDetails key={i}>
                  {item}
                  <Button color="secondary" onClick={() => handleDelete(item, heading)}>Delete</Button>
                </AccordionDetails>
              ))}
            </Grid>
          </Accordion>
        );
      })}
    </>
  );
}
BarMenuList.propTypes = propTypes.any;
