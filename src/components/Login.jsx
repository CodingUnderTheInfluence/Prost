import React from 'react';

export default function Login({setAuth}){
  return (
    <>
    <p>Login in with google</p>
      <button onClick={()=> setAuth(true)} >Log in</button>
    </>
  );
};