import React, { useState } from 'react';
import {
  Grid,
  useTheme,
  MobileStepper,
  makeStyles,
} from '@material-ui/core';
import SafetyDialog from './Dialog.jsx';
import BarInfo from './Form Components/BarInfo.jsx';
import OwnerInfo from './Form Components/OwnerInfo.jsx';

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    flexGrow: 1,
    justify: 'center',
    background: 'transparent',
  },
});

const OwnerForm = ({ setBarId, setLandingView }) => {
  const theme = useTheme();
  const classes = useStyles();
  const [counter, setCounter] = useState(0);
  const [barName, setBarName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [number, setNumber] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [image, setImage] = useState('');
  const [occupency, setOccupency] = useState('');
  const [activeStep, setActiveStep] = useState(0);

  /*
  These control the stepper
  */
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const renderOwnerForm = () => {
    if (counter === 1) {
      return (
        <div>
          <Grid
            item
            container
            direction="row"
            justify="center"
            alignItems="center"
            column="center"
          >
            <div>
              <MobileStepper
                variant="dots"
                steps={2}
                position="static"
                activeStep={activeStep}
                className={classes.root}
                nextButton
                backButton
                alignItems="center"
              />
            </div>
          </Grid>
          <BarInfo
            setCounter={setCounter}
            setBarName={setBarName}
            setAddress={setAddress}
            setCity={setCity}
            setState={setState}
            setZip={setZip}
            setNumber={setNumber}
            setLat={setLat}
            setLng={setLng}
            barName={barName}
            address={address}
            number={number}
            setImage={setImage}
            setOccupency={setOccupency}
            setLandingView={setLandingView}
            activeStep={activeStep}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        </div>
      );
    } if (counter === 2) {
      return (
        <div>
          <Grid
            item
            container
            direction="row"
            justify="center"
            alignItems="center"
            column="center"
          >
            <div>
              <MobileStepper
                variant="dots"
                steps={2}
                position="static"
                activeStep={activeStep}
                className={classes.root}
                nextButton
                backButton
                alignItems="center"
              />
            </div>
          </Grid>
          <OwnerInfo
            setCounter={setCounter}
            barName={barName}
            address={address}
            city={city}
            state={state}
            zip={zip}
            number={number}
            lat={lat}
            lng={lng}
            image={image}
            capacity={occupency}
            setBarId={setBarId}
            setCounter={setCounter}
            activeStep={activeStep}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        </div>
      );
    }
    return (
      <SafetyDialog setCounter={setCounter} setLandingView={setLandingView} />
    );
  };
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      column="center"
    >
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="center"
        column="center"
      >
        {renderOwnerForm()}
      </Grid>
    </Grid>
  );
};

export default OwnerForm;
