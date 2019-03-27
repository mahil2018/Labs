import React, { Component } from 'react';

// STATE CAN LIVE ONLY INSIDE CLASS COMPONENT
class Counter extends Component {
    // 1st way: using constructor and don't forget to use "this" in front of "state"
    // "constructor" => method represents the class itself, the object thats' created as an instance
    constructor(){
        // using "super" we have access to all the parent's (Component's) properties  
        super();
        // console.log('what: ', this); ==> "this" is the class itself 

        // ✅ state is always object
        this.state = {
            count: 0
        };
    }

    // 2nd way:
    // state = {
    //     count: 0
    // }

    counterPlus(){
        console.log('counting');
        // this.state.count=+1; ===>> 🚨🚨🚨🚨🚨🚨🚨🚨🚨

        // ✅ use this.setState() method when updating the state
        this.setState({
            count: this.state.count + 1
        });
    }

    render (){
        return (
            <div>
                <p> { this.state.count } </p>
                <button onClick={ () => this.counterPlus()  }   > + count </button>
            </div>
        )
    }
}

export default Counter;
