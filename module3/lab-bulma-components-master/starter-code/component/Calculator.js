import React, { Component } from 'react';
import Label from './labels/Label';

class Calculator extends Component {
  constructor(props)
//   {
//     ...
//   }
//   ...
getColor = (theCelsius) => {
      let color;
      console.log('here', theCelsius)
if(theCelsius < 100){
        color = "green";
      } else if(theCelsius >= 100 && theCelsius < 200){
        color = "orange";
      } else if(theCelsius >= 200){
        color = "red";
      } else {
        color = "black";
      }
return color;
  }
render() {
    // ...
    const colorFromMethod = this.getColor(parseFloat(celsius));
return (
      <div>
        {/* .... */}
<Boiling celsius={parseFloat(celsius)} color={colorFromMethod} /> //!!!
</div>
    )
  }
}
export default Calculator;
