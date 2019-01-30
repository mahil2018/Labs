const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
   })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });

  //Iteration 1 - Recipe Schema
 const recipeSchema = new Schema({
  title : {type: String, required: true, unique: true},
  level: {type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'], 
  ingredients: [], 
  cuisine : {type: String, required: true},
  dishType: {type:String, enum:['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
  image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
  duration: {type: Number, default:0},
  creator: {type: String},
  created: {type: Date, default: Date.now}
 }
});
//connect the schema with the model we are exporting
const Recipe = mongoose.model('Recipe', recipeSchema);


//2.Create a recipe

// Recipe.create({
//     title: 'Sancocho',
//     level: 'UltraPro Chef',
//     ingredients: ['16 cups water’, ‘1 Hen despresada’, ‘1 Pound (500gr.) Of ribs of beef, chopped’, ‘1 Pound (500gr.) Of pork ribs, chopped’, ‘4 Chorizos, matches’, ‘2 Cloves of garlic, fine chopped’, ‘3 whole onion stems’,‘2 ripe tomatoes, peeled and chopped’, ‘2 Green bananas, peeled and split by hand’, ‘1 Pound (500 gr.) Of cassava, peeled and split’, ‘1/2 Pound (250 gr.) Of celery (arracacha), peeled and chopped’, ‘2 Cobs, pieces in pieces’, ‘1/2 Pound (250gr.) Potatoes, small, peeled’, ‘3 Cabbage leaves, chopped’, ‘1 Ripe banana, chopped into pieces with peel’, ‘1/4 Pound (125 gr.) Of soaked chickpeas’, ‘1/4 Pound (125 gr.) Of smoke’, ‘1 grated carrot’, ‘1/4 cup of washed rice’, ‘1 ½ Cup of chorotas ’, ‘Salt, pepper and cumin to taste'],
//     cuisine: 'Colombian',
//     dishType: ['Dish'],
//     image: 'http://www.elcampesino.co/wp-content/uploads/2017/05/Sancocho.jpg',
//     duration: 40,
//     creator: 'Chef Abue'
//   });

// // 3. Insert Many recipes
//  Recipe.insertMany(data)
//  .then (newRecipe => {
//      newRecipe.forEach(({title}) => console.log(`Title is ${title}`));
//  })
//  .catch(error => {
//      console.log("Error adding all recipes to DB: ", error);
//  })

// // Iteration 4 - Update recipe
// Recipe.updateOne({ title: "Rigatoni alla Genovese", duration: 100})
//     .then( myRecipe =>{
//       console.log('Document updated successfully: ', myRecipe)
//     })
//     .catch(err => {
//       console.log("Error while creating new instance", err);   
//     })
//==========.Document updated successfully:  { n: 0, nModified: 0, ok: 1 }

//5. Remove a recipe
// Recipe.deleteOne({ title: "Carrot Cake"})
//     .then( myRecipe =>{
//       console.log('Document deleted successfully: ', myRecipe)
//     })
//     .catch(err => {
//       console.log("Error while creating new instance", err);   
//     })

    //Document deleted successfully:  { n: 1, ok: 1, deletedCount: 1 }
 
//6. Close the Database

Recipe.find() //<======== .find() will ALWAYS give you an ARRAY back
.then( allRecipesFromDB =>{
    allRecipesFromDB.forEach(recipes => {
        console.log(recipes.name);
    })
})
.catch(err => {
    console.log("Error while is looking for", err);   
})

process.on ('SIGHT', () =>{
    mongoose.Connection.close(() => {
        Console.log("Mongoose default connection disconnected through app termination");
        process.exit(0);
    });

});

