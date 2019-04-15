import React from 'react';
import logo from './logo.svg'; // importing logo from src folder

const Header = () => {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React, Ironhacker!</h1>
      <h3>You are ready to take this to the next level!</h3>
    </header>
  );
}

export default Header;
