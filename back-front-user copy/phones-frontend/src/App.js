import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Signup from './components/user-pages/Signup';
import Login from './components/user-pages/Login';
import axios from 'axios';
import { Switch, NavLink, Route } from "react-router-dom";
import Home from './components/Home';
class App extends Component {
  //maintain the user in the section
  constructor(){
    super();
    this.state = {
      currentUser: null,
    }
  }

  //Virtual representation on functions, parents, childs, body, in react virtual dom.. delete ..creat..react doesn't refresh
  //componentdidmount
  componenetDidMount(){
    axios.get(this.newMethod(), {withCredentials:true})
      .then(responseFromBackend => {
        console.log('Response from Backend is :', responseFromBackend.data)
        const {userDoc} = responseFromBackend.data
        this.syncCurrentUser(userDoc);
      })
  }
  syncCurrentUser(user){
    this.setState({ currentUser: user })
  }
 

  render() {
    return (
      <div className="App">
     
        <header className="App-header">
        {/* //this is exam how to normally do the Route */}
        {/* <img src="laHonda.jpg" className="App-logo" alt="pic"/> */}
          <h1>My Phone App</h1>
          <nav>
            <NavLink to="/">Home</NavLink><br />
            < NavLink to="/signup-page">Signup</NavLink><br />
            < NavLink to="login-page">Login</NavLink>
          </nav>
         
        </header>
        <Switch>
           <Route exact path="/" component={Home} />
                {/* <Route path="/somePage component= (someComponentthatWillRenderWhenUserClickThisLind) />" */}
            <Route path="/signup-page" render={ () => 
              <Signup currentUser={this.state.currentUser}
                    onUserChange= { userDoc => this.syncCurrentUser(userDoc)} />
              } />
            <Route path="/login-page" render= { () =>
              <Login currentUser={this.state.currentUser} 
                    onUserChange= { userDoc => this.syncCurrentUser(userDoc)} />
            } />
        </Switch>
            
        <footer>Made with Love by Mahil</footer>
      </div>
    );
  }
}

export default App;
