import React, { Component } from 'react';


class FoodsDetail extends Component {
  
  render() {
    const {foodsDetail} = this.props
    // const foodsDetail = this.props.post
    return (
     
        <div>
          <h1>{foodsDetail.name}</h1>
          <p>{foodsDetail.calories}</p> 
          <img src={foodsDetail.image} alt={foodsDetail.name} />
          {/* <img src={foodsDetail.image} >  */}
          <p>{foodsDetail.quantity} </p> 
      </div>
    )
  }
}

export default FoodsDetail;


