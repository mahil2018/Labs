import React, { Component } from 'react';
import ProductRow from './ProductRow';

class ProductTable extends Component {
  render() {
    var [{ products, checked }] = this.props;
    return (
      <div className="ProductTable">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Calories</th>
            </tr>
          </thead>
          <tbody>
            {products.map((eachProduct, i) => {
              if (checked) {
                if (eachProduct.stocked)
                  return <ProductRow key={i} product={eachProduct} />;
              } else return <ProductRow key={i} product={eachProduct} />;
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ProductTable;