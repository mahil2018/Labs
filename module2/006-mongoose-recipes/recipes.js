const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  //Iteration 1 - Recipe Schema
 const catSchema = new Schema({
  title : {type: String, required: true, unique: true},
  level: {type: ENUM["Easy Peasy", "Amateur Chef", "UltraPro Chef"], 
  ingredients:ENUM,
  cuisine : {type: String, required: true},
  dishType: {type:String, ENUM:["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]},
  image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
  duration: {type: number, default:0},
  creator: {type: String},
  created: {type: Date, default: today}
 }
});

//Create a recipe

recipe.create({ title: this.title, level: this.level, ingredients:this.ingredients, cuisine: this.cuisine, dishType: dishType.this, image: image.this, duration: duration.this, creator: creator.this, created:created.this},
   function (err, recipe) {
  if (err) console.log('An error happened:', err);
  else console.log('The title of the recipe is: ', recipe.title);
});

// Same code but with a Promise version
User.create({ name: 'Alice', job: 'Architect' })
  .then((user) => { console.log('The user is saved and its value is: ', user) })
  .catch((err) => { console.log('An error happened:', err) });