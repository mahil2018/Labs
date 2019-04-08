import React, { Component } from 'react';

class AddFood extends Component {

    constructor(props){
        super(props);
  
        this.state = { 
          name: '',
          calories: '',
        //   image: '',
          quantity: 'number'
        }
    }
    handleNameInput = (event) => {
        this.setState({
          name: event.target.value
        })
      }
      handleCaloriesInput = (event) => {
        this.setState({
          calories: event.target.value
        })
      }
      handleImageInput = (event) => {
        this.setState({
          image: event.target.value
        })
      }
      handleQuantityInput = (event) => {
        this.setState({
          quantity: event.target.value
        })
      }
      handleFormSubmit = (event) => {
        event.preventDefault();
        this.props.AddTheFood(this.state);   
        this.setState({
          name: '',
          calories: '',
        //   image: '',
          quantity: '' 
        })  
      }
   
    render(){
      return (
        <div>
          <form onSubmit={this.handleFormSubmit}>
              <label>Name:</label>
              <input type="text" name="name" value={this.state.name} onChange={(e) => this.handleNameInput(e)} />
    
              <label>Calories:</label>
              <input type="number" name="calories" value={this.state.calories} onChange={(e) => this.handleCaloriesInput(e)} />
    
              <label>Image:</label>
              <input type="image" name="image" value={this.state.image} alt="newFood" onChange={(e) => this.handleImageInput(e)}/>
              
              <label>Quantity:</label>
              <input type="text" name="quantity" value={this.state.quantity} placeholder="Quantity" onChange={(e) => this.handleQuantityInput(e)} />
              
              <input type="submit" value="Submit" />
          </form>
        </div>
      )
    }
  }
  
  export default AddFood;
  
  