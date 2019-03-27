import React, { Component } from 'react';
class AddProduct extends Component {
    constructor(props){
        super(props);
        // the state the way as it is defined in the constructor is
        //the initial state
        this.state = {
            _id: "",
            name: "",
            price:"",
            inStock:false
        };
        console.log(this.props);
    }
    // this method is reusable for anyu form !!!!!!
    onChangedHandler (event){
        //console.log("event is : ", event.target);
        let {name, value} =event.target;
        console.log(name,value);

        //CASE OF CHECKBOX
        if (name === 'InStock' && value === 'on'){
            value = true;
        }
        this.setState({ [name]:value});

        //IF WE DON'T HAVE THIS ONE GENERIC METHOD, WE WOULD HAVE 
        //ADDITIONAL METHODS TO HANDLE CHANGE IN EACH INPUT FIELD:
        //Case of input with the name: name
        this.setState({
            name: event.target.value
        })
        //case of input withthe name: price
        this.setState({
           price: event.target.value 
        })
    }


}

export default AddProduct;