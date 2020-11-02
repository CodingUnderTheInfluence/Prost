import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TestBtn = () => {
  const [ user, setUser ] = useState('');

  // const userToDB = async () => {
  //   const postUser = await axios.post('/db/customer');
  //   console.log(postUser);
  // }

  const handleClick = () => {
    axios.get('/db/customer/:Nico')
      .then(data => {
        console.log(data);
      })
      .catch(err => console.log(err))
  };

  return (
    <button onClick={handleClick}>get People</button>
  );

};

export default TestBtn;