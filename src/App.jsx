import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import LandingPage from './components/LandingPage.jsx';
import CustomerView from './components/Customer/CustomerView.jsx';
import OwnerView from './components/Owner/OwnerView.jsx';

function App() {

  const [value, setValue] = useState('');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (!localStorage.token) {
      handleChange('');
    } else if (localStorage.token) {
      handleChange(null, 'CustomerView')
    }
  })

  if (value === 'CustomerView') {
    return <CustomerView />
  } else if (value === 'OwnerView') {
    return <OwnerView />
  } else {
    return <LandingPage />
  }
  // const renderView = () => {
  //     if (value === 'Landing') {
  //         return <LandingPage />
  //     }
  //     if (value === 'CustomerView') {
  //         return <CustomerView />
  //     }
  //     if (value === 'OwnerView') {
  //         return <Messages />
  //     }
  //     if (value === 'Wrong') {
  //       return (<div>You screwed up, kid!</div>)
  //   }
  // }

  // <Grid container direction="column" justify="center" alignItems="center">
  //           <Grid item container direction="row" justify="center" alignItems="center">
  //               {renderView()}
  //           </Grid>
  //           <Grid item container direction="row" justify="center" alignItems="center">
  //               <Paper className={classes.root}>
  //                   <Tabs
  //                       value={value}
  //                       onChange={handleChange}
  //                       indicatorColor="primary"
  //                       textColor="primary"
  //                       centered
  //                   >
  //                       <Tab icon={<PeopleAltIcon />} label="Friends" />
  //                       <Tab icon={<AddCircleOutlineIcon />} label="Create" />
  //                       <Tab icon={<ForumIcon />} label="Messages" />
  //                       <Tab icon={<AccountCircleOutlinedIcon />} label="Profile" />
  //                   </Tabs>
  //               </Paper>
  //           </Grid>
  //       </Grid>


}

export default App
