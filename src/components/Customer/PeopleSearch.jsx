import React, { useState } from 'react';
import axios from 'axios';


const PeopleSearch = () => {
  const [ input, setInput ] = useState('');
  const [ friends, setFriends ] = useState([]);

  // const handleClick = async () => {
  //   try {
  //     const friendsDB = axios.get(`/db/customer/:${input}`);
  //     console.log(friendsDB);
  //   }
  //   catch(err) {
  //     console.error(err);
  //   } 
  // };

  const handleInput = (e) => {
    setInput(e.target.value);
    // console.log(input);  
  };

  const submit = (e) => {
    if (e.keyCode === 13) {
      axios.get(`/db/customer/${e.target.value}`)
        .then(data => {
          console.log(data.data);
        })
        .catch(err => console.error(err));
    }
  };

  return (
    <input type='text' value={input} onKeyDown={submit} onChange={handleInput} />
  );
};


export default PeopleSearch;