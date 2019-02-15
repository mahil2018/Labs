const express        = require("express");
const router         = express.Router();  //making const a router of express
// Require user model
const User           = require('../models/user');


// const ensureLogin = require("connect-ensure-login");  // instead middleware isLoggedIn function
//localhost:3000/private.......GET /private 404 20.766 ms - 565
router.get('/private', isLoggedIn, (req, res, next) => {
  // console.log('wow');
  res.render("passport/private", {user: req.user});       //we take user to assig req.user to use in the hbs file
});






// middleware
function isLoggedIn(req, res, next){
  if(req.user){
    next()
  } else {
    res.redirect('/login');
  }
}
module.exports = router;