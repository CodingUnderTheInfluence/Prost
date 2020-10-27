import React from 'react';
import ReactDOM from 'react-dom';
import Create from './components/Create.jsx';
import MapContainer from './components/Map.jsx';
const Index = () => {
  return (
    <>
      <div>Welcome to React!</div>
      <div>Hello world!</div>
      <Create />
      <MapContainer />
    </>
  );
};
ReactDOM.render(<Index />, document.getElementById('root'));
