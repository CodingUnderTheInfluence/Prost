import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function Language({ setPref }) {
  const [langs, setLangs] = React.useState({
    English: 'en',
    Spanish: 'es',
    French: 'fr',
  });
  return (
    <FormControl component="fieldset">
      <RadioGroup row aria-label="position" name="position" defaultValue="English">
        <FormControlLabel
          value="French"
          control={<Radio color="primary" onChange={() => setPref(langs.French)} />}
          label="French"
          labelPlacement="top"
        />
        <FormControlLabel
          value="English"
          control={<Radio color="primary" onChange={() => setPref(langs.English)} />}
          label="English"
          labelPlacement="top"
        />
        <FormControlLabel
          value="Spanish"
          control={<Radio color="primary" onChange={() => setPref(langs.Spanish)} />}
          label="Spanish"
          labelPlacement="top"
        />
      </RadioGroup>
    </FormControl>
  );
}
