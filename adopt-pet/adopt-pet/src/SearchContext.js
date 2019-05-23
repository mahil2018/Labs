import React from "react";

const SearchContext = React.createContext({  //createContext is a function that returns an object with two React componenets in it: a 
    // Provider (how you scope where a context goes) and a 
    // Consumer (how you consume from the above provider. A Consumer  accepts a function as a child and gives it the context which you can use).

    location: "Seattle, WA",
    animal: "",
    breed: "",
    breeds: [],
    handleAnimalChange() {},
    handleBreedChange() {},
    handleLocationChange() {},
    getBreeds() {}
  });
  
  export const Provider = SearchContext.Provider;
  export const Consumer = SearchContext.Consumer;