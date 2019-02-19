
// Add passport 
const passport        = require("passport");
const SlackStrategy   = require('passport-slack').Strategy;
// Require user model
const User            = require('../../models/user');
passport.use(new SlackStrategy({
  clientID: process.env.slackClientId,    // you need to access OAuth & Permisssions in slack,  and redirect URL,
                                        // redirect with redirect URLs the new URLS, cause OAuth Erroo: redirect_uri not match any configured URIs
  clientSecret: process.env.slackClientSecret,
  callbackURL: '/slack/callback',
  proxy: true,  // not important now, but yes when in production
}, (accessToken, refreshToken, userInfo, cb) => {
  // console.log('who is this:', userInfo);
  //es6 destructuring
  const { email, name} = userInfo.user;
  // this is the same as saying const email in the 
  
  User.findOne({ $or:[
    //email: email
    { email: email },
    {slackID : userInfo.user.id }
  ]})
  .then(user => {
    if (user) {
      // log the user in if we found the account in our DB
      cb(null, user);
      return;
    }
    User.create({
      //email:email
      email,
      fullname: name,
      slackID: userInfo.user.id
    })
    .then( newUser =>{
      cb(null, newUser);
    })
    .catch( err => next(err))  // close User.creat()
  })

}));

