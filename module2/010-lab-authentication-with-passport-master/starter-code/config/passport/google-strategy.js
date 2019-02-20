
const passport =require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../../models/user');

passport.use(new GoogleStrategy({
  clientID: '=tq9.apps.googleusercontent.com',
  clientSecret: '7=E',
  callbackURL: '/google/callback',
  proxy: true // important for production
}, (accessToken, refreshToken, userInfo, cb) => {
  console.log('Google acc: ', userInfo);
  const { displayName, emails } = userInfo;
  //Check Point to check if the user already exist in the DB
  User.findOne({ $or: [
    { email: emails[0].value }, //console shows emails: [ { value: 'mari************@gmail.com', type: 'account' } ],
    { googleID: userInfo.id }   //Google acc:  { id: '117*****************08',
  ] })
  .then( user => {
    if(user){
      cb(null, user); // log in the user if the user already exists
      return;
    } 
    User.create({
      email: emails[0].value,
      fullName: displayName,  //in the console we see, displayName: 'M***a R*****o',
      googleID: userInfo.id
    })
    .then( newUser => {
      cb(null, newUser)
    } )
    .catch( err => next(err) );
  } )
  .catch( err => next(err) );
}))
