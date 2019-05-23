

import React from "react";
import SearchBox from "./SearchBox";
import { navigate } from "@reach/router/lib/history";

class Search extends React.Component {
    Search() {
        navigate("/");
    }
  render() {
      
    return (
      <div className="search-route">
        <SearchBox search={this.search} />
      </div>
    );
  }
}

export default Search;


