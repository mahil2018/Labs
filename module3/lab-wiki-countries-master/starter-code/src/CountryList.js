import React, { Component } from 'react';
import countries from './countries.json';

import { Switch, Route, Link } from 'react-router-dom';

import CountryDetail  from './CountryDetail';
// import './App.css';

class CountryList extends Component {
  constructor (props) {
    super(props);
    this.state={
      countries: countries
    };
  }
  render() {
      const { countries }  = this.state;
      return (
        <div className="country">
          
          <h1>World Countries</h1>
          {countries.map(country =>  {
            return(
              <div className="country-list">
                <div className="container">
                  <div className="row">
                    <div className="col-5" style={{maxHeight: '90vh', overflow: 'scroll'}}>
                      <div className="list-group">
                        <Link to={`/${country.cca3}`} className="list-group-item list-group-item-action" >{`${country.name.official} - ${country.flag}`}</Link>                    
                      
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <Switch>
            <Route exact path='/:id' component={CountryDetail}/>
          </Switch>
      </div>
    );
  }
}

export default CountryList;