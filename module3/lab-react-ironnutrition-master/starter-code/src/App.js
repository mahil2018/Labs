import React, { Component } from 'react';

import './App.css';
import 'bulma/css/bulma.css';
import foods from './foods.json';
import Header from "./Header";
import Food from "./FoodBox";
import AddFood from './AddFood';
import SearchFood from './SearchFood'


class App extends Component {
  addFoodHandler = (theFood) => {
    const foodsCopy = [...this.state];
    foodsCopy.push(theFood);
    this.setState({
      foods: foodsCopy
    })
  }
  render() {
    return (
      <div className="App">
        <Header />
        <Food />
        <AddFood AddTheFood = {this.addFoodHandler} />
        <SearchFood products={foods} />
      </div>
    );
  }
}

export default App;
