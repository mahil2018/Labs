const express        = require("express");
const router = express.Router();  //making const a router of express
// Require user model
const User = require('../models/user');
// Add bcrypt to encrypt passwords
const bcrypt  = require("bcryptjs");
const bcryptSalt = 10;
// Add passport 
const passport  = require("passport");



// const ensureLogin = require("connect-ensure-login");  // instead middleware isLoggedIn function
router.get("/signup",  (req, res) => {
  res.render("passport/signup");
});

//localhost:3000/register ======== POST /register 404 76.037 ms - 565
router.post('/register', (req, res, next) => {
  console.log('hi', req.body);
  const userEmail = req.body.email;
  const userFullname = req.body.fullname;
  const userPassword = req.body.password;

  if (userEmail == '' || userPassword == '' || userFullname == '') {
    req.flash('error', 'please fill all the fields')
    res.render('passport/signup');
    return;
  }

  User.findOne({'email': userEmail})
    .then(foundUser =>{
      if (foundUser !== null){
        req.flash('error', 'Sorry, there is already user with the same email!');
        res.redirect('/login');
        //here we will redirect to '/login'
        return;  
      }
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPassword = bcrypt.hashSync(userPassword, salt);
      User.create({
        email : userEmail,
        fullname : userFullname,
        password : hashPassword
      })
      .then(user => {
        //if all good, log in the user automatically
        // console.log('redirecting to another page:', user);
        req.login(user, (err) => {      // auto login, automatic login, entrance to the session
          if(err){
            // req.flash.error = 'some message here'
            req.flash('error', 'Auto login does not work so please log in manually');
            req.redirect('/login');
            return;
          }
          res.redirect('/private');
        })
      }) 
      .catch( err => next(err)); // closing User.create
    })
    .catch( err => next(err));  //closing User.findOne()
})

//authentication
router.get('/login', (req, res, next) => {
  res.render('passport/login');
});

router.post("/auth", passport.authenticate("local", {
  successRedirect: "/private",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

//========================LOGOUT=======
router.post("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/login");
})



module.exports = router;