import React, { Component } from 'react';
import foods from './foods.json';
import FoodsDetail from './FoodsDetail';



class Food extends Component {
  

  
  render() {
   
    return (
     
        <div className="image-container">
        
          {foods.map((object, index) => {
            return (
            <FoodsDetail foodsDetail={object[0]} key={`food-box-list-key ${index}`} />,
            <FoodsDetail foodsDetail={object} key={`food-box-list-key ${index}`} />
           
            )
          })}
      </div>
      
    );
  }
}

export default Food;

