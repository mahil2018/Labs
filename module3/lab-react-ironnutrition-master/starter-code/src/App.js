import React, { Component } from 'react';

import './App.css';
import 'bulma/css/bulma.css';
import Header from "./Header";
import Food from "./FoodBox";
import AddFood from './AddFood';
import SearchBar from './SearchBar';

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
        <SearchBar searchBoxName={"userNameSearch"} onSearchTermChange={this.onSearch} />
      </div>
    );
  }
}

export default App;
