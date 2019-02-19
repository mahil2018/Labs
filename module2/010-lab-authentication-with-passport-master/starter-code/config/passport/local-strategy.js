
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require('../../models/user');

passport.use(new LocalStrategy({ 
  usernameField: 'email'}, (email, password, next) => {
  User.findOne({ email })      //, (err, user) => {
    .then (userFromDb =>{
      if(!userFromDb){
        return next(null, false, { message: 'Incorrect email!'})
      }
      if(!bcrypt.compareSync(password, userFromDb.password)){
        return next(null, false, { message: 'Incorrect password!'})
      }
      return next(null, userFromDb)
  })  
  .catch( err => next(err))

}));
  
  // .then (user =>{
  //     if (err) {
  //       return next(err);
  //     }
  //     if (!user) {
  //       return next(null, false, { message: "Incorrect username" });
  //     }
  //     if (!bcrypt.compareSync(password, user.password)) {
  //       return next(null, false, { message: "Incorrect password" });
  //     }

  //     return next(null, user);
  //     })
    
  //   .catch(err => next(err))
  // }); 
