import React, { Component } from 'react';
// import countries from './countries.json';
import Header from './Header';
import CountryList from './CountryList';
import { Switch, Route, Link } from 'react-router-dom';

// import CountryDetail  from './CountryDetail';
import './App.css';

class App extends Component {
  
  
  render() {
    return(
      <div>
          <Header />
          <CountryList />
      </div>
     
    )        
  }
}

export default App;
