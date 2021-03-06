import React, { Component } from "react";
import { Button, Form, Message} from 'semantic-ui-react';
import axios from "axios";
import {Link, NavLink, Redirect} from 'react-router-dom'
// import { Message } from 'semantic-ui-react';
import ModalExample from './ModalExample';



class Login extends Component {
   constructor(props) {
     super(props)
     this.state = {
       email:"",
       originalPassword:"",
       message: null,
     }
   }

genericSync(event){
  const { name, value } = event.target;
  this.setState ({ [name]: value });
}

handleSubmit(event) {
  event.preventDefault();
  axios.post(
    'http://localhost:3001/api/login',
    this.state,
    { withCredentials: true }, // FORCE axios to send cookies across domains
)
    .then(response => {
      console.log("Login Page", response.data);
      const { userDoc } = response.data;
      //send "userDoc" to the App.js function that changeS "currentUser"
      this.props.onUserChange(userDoc);
    })
    .catch(err => {
      if (err.response && err.response.data){
        // console.error("API response", err.response.data)
        return this.setState({ message: err.response.data.message })
      }
    })
}
   render(){
    
    return(
      <Form size="large" onSubmit={event => this.handleSubmit(event)}>
      <Form.Group width="equal">
      <div>
         
          <ModalExample />
      </div>
      
        <Form.Input 
            value={this.state.email}
            onChange={event => this.genericSync(event)}
            name="email" 
            // fluid
            icon="user"
            iconPosition="left"
            placeholder="Email address"
            label="Email Address" 
          />
        <Form.Input 
            value={this.state.originalPassword}
            onChange={event => this.genericSync(event)}
            name="originalPassword" 
            // fluid
            icon="lock"
            iconPosition="left"
            label="Password" 
            placeholder="Password" 
            type="password"/>
      </Form.Group>
      {/* <Form.Button>Submit</Form.Button> */}
      {/* <Button color="blue" fluid size="large" onClick={() => console.log('Clicked')}>Login</Button> */}
      <Button color="blue" size="large" icon >Login</Button>
  
    </Form>
    // <Link>
    // Already Have an account? <NavLink to={"/login-page"}> Login</NavLink>
    // </Link >
    )
    
   }
};

export default Login;