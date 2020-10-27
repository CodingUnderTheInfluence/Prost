import React from 'react';

export default function App({setAuth}) {
  return (
    <>
      <div>You're Logged-out</div>
      <button onClick={()=> setAuth(false)} >Log Out</button>
    </>
  );
};