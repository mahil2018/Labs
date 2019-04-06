import logo from './logo.svg';
import React from 'react';

const Header = () => {
  return(
    <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <h1 className="App-title">Welcome to React</h1>
    <p className="App-intro">
      To get started, edit <code>src/App.js</code> and save to reload.
    </p>
    </header>
  )
}

export default Header;
