import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Counter from './components/Counter';
import StudentList from './components/StudentList';
import ProductsList from './components/ProductList';

class App extends Component {
  render() {
    return (
      <div className="App">
       <Header />
       <Counter />
       <StudentList />
       <ProductsList />
      </div>
    );
  }
}

export default App;
