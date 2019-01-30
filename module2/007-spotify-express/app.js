const express  = require('express');
const hbs      = require('hbs');
const mongoose = require('mongoose');
const path     = require('path');

const app = express();
var SpotifyWebApi = require('spotify-web-api-node');

// app.set('views', __dirname, + '/views');
// app.set('view engine', 'hbs');

// app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

// Remember to paste your credentials here
// const   clientId = process.env.clientId
//         clientSecret = process.env.clientSecret;
//         access_token = '';

const   clientId = 'b2d118cb235041a49e8a83c8f5b955f2'
        clientSecret = 'a9a094e2297641ab9ae85cc332c2f61d'


    // require environment package helper
// require('dotenv').config();
// Remember to paste your credentials here
const spotifyApi = new SpotifyWebApi({
    clientId : clientId,
    clientSecret : clientSecret
});

//Retrieve an access token
spotifyApi.clientCredentialsGrant()
  .then(data => {
    // console.log("data is: ", data)
    spotifyApi.setAccessToken(data.body['access_token']);
  })
  .catch( err =>{
    console.log('Something went wrong when retrieving an access token', err);
});

// Search artists whose name contains 'Love'
// spotifyApi.searchArtists('Love')
  // .then(function(data) {
  //   console.log('Search artists by "Love"', data.body);
  // }, function(err) {
  //   console.error(err);
  // });

//routes go here:
/* GET home page */
app.get('/', (req, res, next) => {
  res.render('home');
});

// spotifyApi.searchArtists(/*'HERE GOES THE QUERY ARTIST'*/)
//     .then(data => {
//       // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
//     })
//     .catch(err => {
//       // ----> 'HERE WE CAPTURE THE ERROR'
//     })


// Search artists whose name contains 'Love'
app.get('/artists', (req, res, next) =>{
  //search artist whose name contains any search
  console.log("req ======", req.query);
spotifyApi.searchArtists(req.query.theArtistName)
  .then(data => {
    // console.log('Search artists by ====', data.body.artists.items);
    res.render('artists', { allTheArtists: data.body.artists.items })
  })
  .catch( err => console.log("Error while getting the artists: ", err));
})




app.listen(3000);