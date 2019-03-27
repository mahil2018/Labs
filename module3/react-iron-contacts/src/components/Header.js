import React from 'react';
import logo from '../logo.svg';
import './Header.css';
import Title from './Title';

// function header(){
//     return(
//         <header> 
//             <img src={logo} alt="react-logo" className="App-logo" />
//             <h1> My first create-react-app!</h1>
//         </header>
//     )
// };

//the following is the same as above just usin ES6 syntax

//FUNCTIONAL COMPONENT IS ALWAYS "STATELESS"

const header = () => {
    return (
        <header>
            <img src={logo} alt="react-logo" className="App-logo" />
            <Title message="My first create-react-app!!" />
        </header>
    )
}
export default header;