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
    render(){
        return(
            <div>
                <h2> Add a new product</h2>
                {/* handleFormSubmit => this is the way we called the method */}
                <form onSubmit={event => this.handleFormSubmit(event)}>
                    <label>ID: </label>
                    <input
                        // onChangehandleFormSubmit
                        name="_id"
                        type="text"
                        value={ this.state._id}
                    />
                    <br />
                    <label>NAME: </label>
                    <input
                        name="name"
                        type="text"
                        value={ this.state.name}
                    />
                    <br />
                    <label>PRICE: </label>
                    <input
                        name="price"
                        type="number"
                        value={ this.state.price}
                    />
                    <br />
                    <label>IN STOCK: </label>
                    <input
                        name="inStock"
                        type="checkbox"
                        checked={ this.state.inStock}
                    />
                    <br />
                    <button> Save new product</button>

                </form>

            </div>
        )
    } 

}

export default AddProduct;