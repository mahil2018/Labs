const express        = require("express");
const router = express.Router();  //making const a router of express
// Require user model
const User = require('../models/user');


// const ensureLogin = require("connect-ensure-login");  // instead middleware isLoggedIn function
router.get("/private-page", isLoggedIn, (req, res) => {
  res.render("passport/private", { user: req.user });       //we take user to assig req.user to use in the hbs file
});






// middleware
function isLoggedIn(){
  if(req.user){
    next()
  } else {
    red.redirect('/login');
  }
}
module.exports = router;