import React, { useEffect, useState } from 'react';
import {
  Accordion, AccordionSummary, AccordionDetails, Typography, Grid, Button,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import propTypes from 'prop-types';
import { addItem } from '../../../helpers/menu';

export default function BarMenuList() {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-label="Expand"
        aria-controls="additional-actions1-content"
        id="additional-actions1-header"
      >
        <Typography color="textPrimary">
          heading
        </Typography>
      </AccordionSummary>
      <Grid item xs={12} md={6}>
        <AccordionDetails>
          Item Name
          <Button color="secondary">Delete</Button>
        </AccordionDetails>
      </Grid>
    </Accordion>
  );
}
BarMenuList.propTypes = propTypes.any;
