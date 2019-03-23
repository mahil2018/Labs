import React, { Component } from "react";
import "./App.css";
import FormField from '../component/FormField'
import Navbar from '../component/Navbar'
import CoolButton from '../component/CoolButton'
import Message from '../component/Message'


class App extends Component {
    render() {
        return (
            <div className="App">
                <Navbar/>
                <FormField label="Name" type="text" placeholder="Maria Romero" />
                <FormField label="Email" type="email" placeholder="mariahromeroa@gmail.com" />
                <CoolButton classname="CoolButton" issmall isdanger>Button 1</CoolButton> 
                <CoolButton issmall issuccess>Button 2</CoolButton>
                <Message isInfo title="Hello World"/>   
            </div>
        );
    }
}

export default App;