
import React, { Component } from 'react';

class ProductRow extends Component {
  render() {
    const { stocked, name, price } = this.props.product;
    const nameStyle = stocked ? { color: 'black' } : { color: 'dodgerblue' };
    return (
      <tr className="ProductRow">
        <td style={nameStyle}>{name} </td>
        <td> {price} </td>
        <td> {stocked ? 'Yes' : 'No'} </td>
      </tr>
    );
  }
}

export default ProductRow;