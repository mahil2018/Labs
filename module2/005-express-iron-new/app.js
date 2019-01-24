const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
//https://www.npmjs.com/package/punkapi-javascript-wrapper install punkAPI on the terminal and declare:
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();  //constructor

// tell our Express app that HBS will be in charge of rendering the HTML:
app.set('view engine', 'hbs');
// creates an absolute path pointing to a folder called "views"
app.set('views', __dirname+ '/views');
// creates an absolute path to a statis folder public, to manage all assets
app.use(express.static(path.join(__dirname, 'public')));
// in order to use partials we have to REGister them
hbs.registerPartials(__dirname + "/views/partials");

//first route with a callback with 3 placeholders
app.get('/', (req, res, next) =>{
    //render the first page home without ext 
    res.render('home');
});

//second route with a callback with 3 placeholders
app.get('/beers', (req, res, next) =>{
//.getBeers => method we get from punkAPI
    punkAPI.getBeers()
    // responseFromDB is just placeholder, can be any word
  .then(responseFromDB => { //==================> .this() holds success callback
       console.log("Response is:", responseFromDB);
                //we are renaming resposeFromDB to allBeers variable whicch we'll  use in the views
     res.render('beers', {allBeers: responseFromDB})
  })
  .catch(error => { //==================> .catch() is failure  callback
    console.log(error)
  })
});

//third route with a callback with 3 placeholders
app.get('/random-beer', (req, res, next) =>{
    punkAPI.getRandom()
  .then(beers => {
    console.log(beers[0]);
    res.render('random-beer', {randomBeer: beers[0]});
    
  })
  .catch(error => {
    console.log(error)
  })
    
});

app.listen(3000, () => console.log("Running on 3000"));







