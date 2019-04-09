import React, { Component } from 'react';
import foods from './foods.json';
import SearchBar from './SearchBar';
import ProductTable from './ProductTable'



class SearchFood extends Component {
  constructor(props){
      super(props)
      this.state = {
          query:'',
          checked: false,
          products: foods.foods  ///////////////////////
      }
  }
  handleSearch = e => {
    this.setState({ query: e.target.value }, () =>
      console.log(this.state.query)
    );
  };

  handleCheckBox = () => {
    const { checked } = this.state;
    this.setState({
      checked: !checked,
    });
  };
  
  render() {
    const { checked, products } = this.state
    return (
     
        <div className="FilterProductTable">
        <h1>Foods Available </h1>
                <SearchBar 
                searchBoxName={"this.handleSearch"} 
                onSearchTermChange={this.handleCheckBox} />
                {/* <ProductTable checked = {checked} products= {products} /> */}
      </div> 
    );
  }
}

export default SearchFood;

