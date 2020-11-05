import React, { useState } from 'react';
import axios from 'axios';


const PeopleSearch = ({ searchBox }) => {
  const [input, setInput] = useState('');
  const [friends, setFriends] = useState([]);

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
  };

  const submit = async (e) => {
    if (e.keyCode === 13) {
      try {
        const friends = await axios.get(`/db/customer/${e.target.value}`);
        const { data } = friends;
        setFriends(data);
      } catch (err) {
        console.warn(err);
      }
      setInput('');
    }
  };

  return (
    <>
      <input
        type='text'
        value={input}
        onKeyDown={submit}
        onChange={handleInput}
      />
      {friends.length
        ? friends.map(({ first_name, last_name }) => (
          <div>{`${first_name} ${last_name}`}</div>
        ))
        : null
      }
    </>
  );
};

export default PeopleSearch;
