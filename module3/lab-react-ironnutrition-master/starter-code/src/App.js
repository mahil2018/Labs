import React, { Component } from 'react';

import './App.css';
import 'bulma/css/bulma.css';
import Header from "./Header";
import Food from "./FoodBox";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Food />
      </div>
    );
  }
}

export default App;
