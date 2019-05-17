import React from "react";
import ReactDOM from "react-dom";
import 'semantic-ui-css/semantic.min.css';
import { Router, Link } from "@reach/router";
import axios from "axios";
// import pf from "petfinder-client";
import { Container } from 'semantic-ui-react';
// import { Header } from 'semantic-ui-react';
import Login from './Login';
import Signup from './Signup';
import ButtonExample from './ButtonExample';
import Results from "./Results";
import Details from "./Details";
import SearchParams from "./SearchParams";
// import { Provider } from "./SearchContext";



class App extends React.Component {
  constructor(){
    super();
    this.state = {
      currentUser: null,
    }
  }

  componentDidMount(){
    axios.get(`${process.env.REACT_APP_API_URL}/api/checkuser`, { withCredentials:true })
    .then(responseFromBackend => {
      // console.log("Check User in APP.JS: ",responseFromBackend.data)
      const { userDoc } = responseFromBackend.data;
      this.syncCurrentUser(userDoc);
    });
  }
  syncCurrentUser(user){
    this.setState({ currentUser: user });
    console.log(this.state);
  }
  logout(){
    axios.delete(
      `${process.env.REACT_APP_API_URL}/api/logout`,
      {withCredentials:true}
    )
    .then(()=> this.syncCurrentUser(null))
    .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
          <header>
              <Link to='/'>Adopt Me!</Link>
          </header>
          <span>
          <Link to='/signup'>Sign Up</Link>
          <Link to='/login'>Login</Link>
          </span>
          <Container>
          
            {/* <Login /> */}
            <ButtonExample />
          </Container>
          <Router>
            <Login path="/login" />
            <Signup path="/signup" />
            <Results path="/" />
            <Details path="/details/:id"/> 
            <SearchParams path="/search-params" />  
          </Router>
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById("root"));
