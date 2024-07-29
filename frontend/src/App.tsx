import React from 'react';
import logo from './logo.svg';
import './App.css';
import { addToBucket } from './util/s3Helper'

function App() {
  const onClickHandler = (e:any) => {
    console.log(e.target.value);
    addToBucket(e.target.value, e.target.value); 
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <input type="file" name="file" accept="image/*" onChange={onClickHandler}></input>
      </header>
    </div>
  );
}

export default App;
