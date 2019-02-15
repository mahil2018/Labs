// const session = require("express-session");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const flash = require("connect-flash");
const User = require('../../models/user');
//Strategy, User serialize and User deserialize
                    // user is a placeholder
passport.serializeUser((user, cb) => {
  cb(null, user._id);
});
                      //id is a placeholder
passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

passport.use(new LocalStrategy({ usernameField: 'email'}, (email, password, next) => {
 
  User.findOne({ email }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { message: "Incorrect username" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: "Incorrect password" });
    }

    return next(null, user);
  });
}));




function passportBasicSetup(blah){
  // configure the express-session, indicating which is the secret key 
  // blah.use(session({
  //   secret: "our-passport-local-strategy-app",
  //   resave: true,
  //   saveUninitialized: true
  // }));
  blah.use(flash());

  blah.use((req, res, next) => {
    res.locals.messages = req.flash();  // messages defined in all app. this is a method to define 
    if(req.user){
      res.locals.currentUser = req.user;  // I can use user since any view (hbs), req.user is the user of the session.
    }
    next();
  })
    //to initialize passport and passport session
  blah.use(passport.initialize());
  blah.use(passport.session());

}


module.exports = passportBasicSetup;