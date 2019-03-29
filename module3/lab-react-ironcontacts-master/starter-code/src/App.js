import React, { Component } from 'react';
import Header from './Header'
import Contacts from './components/DisplayContacts'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Contacts />
      </div>
    );
  }
}

export default App;
