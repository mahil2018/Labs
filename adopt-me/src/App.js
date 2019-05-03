import React from "react";
import ReactDOM from "react-dom";
import { Router, Link } from "@reach/router";
// import pf from "petfinder-client";
import Results from "./Results";
import Details from "./Details";
import SearchParams from "./SearchParams";
// import { Provider } from "./SearchContext";



class App extends React.Component {
  render() {
    return (
      <div>
          <header>
              <Link to='/'>Adopt Me!</Link>
          </header>
        <Router>
          <Results path="/" />
          <Details path="/details/:id"/> 
          <SearchParams path="/search-params" />  
        </Router>
      </div>
    );
  }
}


ReactDOM.render(<App/>, document.getElementById("root"));
