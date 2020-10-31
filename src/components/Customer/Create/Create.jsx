import React from 'react'

const Create = () => {
    return (
      
    );
}

const QuickCreate = () => {


    function success(pos) {
      var crd = pos.coords;
    
      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
    }
    
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    
    const handleClick = () => {
      navigator.geolocation.getCurrentPosition(success, error);
    };
    
    
      return (
        <button onClick={handleClick}>I'm drinking!</button>
      );
    };
    
export default Create;