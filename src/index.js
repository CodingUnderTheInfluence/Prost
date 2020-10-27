import React from 'react';
import ReactDOM from 'react-dom';
import Create from './components/Create.jsx';
const Index = () => {
  return (
    <>
      <div>Welcome to React!</div>
      <div>Hello world!</div>
      <Create />
    </>
  );
};
ReactDOM.render(<Index />, document.getElementById('root'));
