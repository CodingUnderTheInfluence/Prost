import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import LandingPage from './components/LandingPage.jsx';
import CustomerView from './components/Customer/CustomerView.jsx';
import OwnerView from './components/Owner/OwnerView.jsx';
import Form from './components/Form/Form.jsx'

function App() {

  const [value, setViewValue] = useState('');
  const [gId, setId] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [username, setUsername] = useState('');
  const handleChange = (event, newValue) => {
    setViewValue(newValue);
  };

  useEffect(() => {
    if (localStorage.customerToken) {
      handleChange(null, 'CustomerView')
    } else if (localStorage.ownerToken) {
      handleChange(null, 'OwnerView')
    } else {
      handleChange(null, 'Landing')
    }
  }, [])

  if (value === 'Landing') {
    return <LandingPage setViewValue={setViewValue} setId={setId} setProfileImage={setProfileImage} setUsername={setUsername} />
  } else if (value === 'CustomerView') {
    return <CustomerView setViewValue={setViewValue} gId={gId} />
  } else if (value === 'OwnerView') {
    return <OwnerView setViewValue={setViewValue} />
  } else if (value === 'form') {
    return <Form setViewValue={setViewValue} gId={gId} profileImage={profileImage} username={username} />
  } else {
    return <LandingPage setViewValue={setViewValue} />
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
