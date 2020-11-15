import React, { useState } from 'react';
import {
  Grid,
  Button,
  Typography,
  TextField,
  makeStyles,
  MobileStepper,
} from '@material-ui/core';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Personal from './Personal.jsx';
import Location from './Location.jsx';
import Emergency from './Emergency.jsx';
import SafetyDialog from './SignUpDialog.jsx';

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    flexGrow: 1,
    justify: 'center',
    background: 'transparent',
  },
  backBtn: {
    opacity: '60%',
  },
});

const CustomerSignUpForm = ({
  gId,
  profileImage,
  username,
  gEmail,
  setLandingView,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [counter, setCounter] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // PERSONAL INFORMATION FIELDS
  const [personalFirst, setPersonalFirst] = useState();
  const [personalLast, setPersonalLast] = useState();
  const [personalNumber, setPersonalNumber] = useState();
  const [personalGender, setPersonalGender] = useState();

  // PERSONAL INFORMATION DATABASE SUBMIT
  const personalInformationSubmit = () => {
    const personalParams = {
      first: personalFirst,
      last: personalLast,
      email: gEmail,
      number: personalNumber,
      gender: personalGender,
      image: profileImage,
      googleId: gId,
      username,
    };
    axios.post('/db/customer/create', { personalParams });
  };

  // LOCATION INFORMATION FIELDS
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [zip, setZip] = useState();
  // LOCATION INFORMATION SUBMIT
  const locationInformationSubmit = () => {
    const locationParams = {
      address,
      city,
      state,
      zip,
      googleId: gId,
    };
    axios.post('/db/customer/location', { locationParams });
  };

  // EMERGENCY CONTACT INFORMATION FIELDS
  const [emFirst, setEmFirst] = useState();
  const [emLast, setEmLast] = useState();
  const [emEmail, setEmEmail] = useState();
  const [emNumber, setEmNumber] = useState();

  // EMERGENCY CONTACT INFORMATION SUBMIT
  const eContactInformationSubmit = () => {
    const emergencyParams = {
      first: emFirst,
      last: emLast,
      email: emEmail,
      number: emNumber,
      id: gId,
    };
    axios.post('/db/eContact/add', emergencyParams);
  };

  const renderCustomerFormView = () => {
    if (counter === 1) {
      return (
        <Personal
          setPersonalFirst={setPersonalFirst}
          setPersonalLast={setPersonalLast}
          setPersonalNumber={setPersonalNumber}
          handleNext={handleNext}
          setCounter={setCounter}
          personalInformationSubmit={personalInformationSubmit}
        />
      );
    }
    if (counter === 2) {
      return (
        <Location
          setAddress={setAddress}
          setCity={setCity}
          setCounter={setCounter}
          setState={setState}
          setZip={setZip}
          locationInformationSubmit={locationInformationSubmit}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      );
    }
    if (counter === 3) {
      return (
        <Emergency
          setEmFirst={setEmFirst}
          setEmLast={setEmLast}
          setEmNumber={setEmNumber}
          setEmEmail={setEmEmail}
          eContactInformationSubmit={eContactInformationSubmit}
          handleBack={handleBack}
        />
      );
    }
    return (
      <SafetyDialog setCounter={setCounter} setLandingView={setLandingView} />
    );
  };

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item container direction="row" justify="center" alignItems="center">
        <div>
          <MobileStepper
            variant="dots"
            steps={3}
            position="static"
            activeStep={activeStep}
            className={classes.root}
            nextButton
            backButton
            alignItems="center"
          />
        </div>
      </Grid>
      <Grid item container direction="row" justify="center" alignItems="center">
        {renderCustomerFormView()}
      </Grid>
    </Grid>
  );
};

export default CustomerSignUpForm;
