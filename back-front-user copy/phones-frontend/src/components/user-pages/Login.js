import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            // these are req.body.name of each input field in the form
           
            email:"",
            originalPassword:"",
            message: null,
        }
    }

    genericSync(event) {
        const {name, value} = event.target;  //encapsula en el target
        this.setState({[name]: value})
    }
    handleSubmit(event){
        event.preventDefault();
        axios.post(
            'http://localhost:3001/api/login', //1st which route I am hitting in the backend
            this.state, // 2nd , since this is a post riytem U gave ti sebd sinetgubg
            {withCredentials:true} //3rd and optional ===. credentials: true ???
        )
        .then(responseFromServer =>{
            console.log('response is: ', responseFromServer)
            const { userDoc } = responseFromServer.data;
            this.props.onUserChange(userDoc) // ask question
        })
        .catch(err =>{
            // console.log('error while signup: ', err)
            if(err.response && err.response.data){
                return this.setState({message: err.response.data.message})
            }
        })
    }

    render() {
        if (this.props.currentUser){
            return <Redirect  to="/" />
        }
        return(
            <section>
            <h2>Login</h2>
            <form onSubmit={event => this.handleSubmit(event)}>
                        <label> E-mail </label>
                        <input
                            value = {this.state.email}
                            onChange = {event => this.genericSync(event)}  //event listener porque react detecta cambios, entonces solo renderiza al enviar la inf completa
                            type= "text"
                            name= "email"
                            placeholder= "e-mail"
                        />
                        <label> Password </label>
                        <input
                            value = {this.state.originalPassword}
                            onChange = {event => this.genericSync(event)}  //event listener porque react detecta cambios, entonces solo renderiza al enviar la inf completa
                            type= "password"
                            name= "originalPassword"
                            placeholder= "mypassword"
                        />
                        <button> Sign Up</button>
                    </form> 
                    {/* // if the message is not NULL then show the message  */}
                    {this.state.message && <div>{this.state.message}</div>}  
                            {/* IF       short if             THEN */} 
            </section>
        )
    }
   
}

export default Login;