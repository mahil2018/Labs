const express = require('express');
const router  = express.Router();

const SpotifyWebApi = require('spotify-web-api-node');

// Remember to paste your credentials here
const clientId = 'b2d118cb235041a49e8a83c8f5b955f2',
    clientSecret = 'a9a094e2297641ab9ae85cc332c2f61d';

const spotifyApi = new SpotifyWebApi({
  clientId : clientId,
  clientSecret : clientSecret
});

spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    spotifyApi.setAccessToken(data.body['access_token']);
  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err);
});

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/artists', (req, res) =>{
  // console.log(req.query)====> { artistName: 'Hillsong' }
  spotifyApi.searchArtists(req.query.artistName)
  .then(function(data) {
    // console.log('Spotyfy gives me the data: ', data.body.artists.items);
    res.render('artists', { allTheArtists : data.body.artists.items});
  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err);
});
  // res.send(req.query);
  // console.log(req.query.artistName)
})

// router.get('/albums/:id', (req, res, next) => {
//   let albumId = req.params.id;
//   Artist.findOne({'id': albumId})
//     .then(album => {
//       res.render("album-detail", { album })
//     })
//     .catch(error => {
//       console.log(error)
//     })
// });

router.get('/albums/:artistId', (req, res, next) => {
  console.log("Id is: ", req.params);
  spotifyApi
                    //  '/albums.:artistId', the second param is optional                  
  .getArtistAlbums(req.params.artistId, { limit: 10 })
    // .then(function(data) {
    //   return data.body.albums.map(function(a) {
    //     return a.id;
    //   });
    // })
    // .then(function(albums) {
    //   return spotifyApi.getAlbums(albums);
    // })
    .then(function(data) {
      // console.log("====== ======", data.body);
      res.render('albums', { allTheAlbums: data.body.items })
    })
    .catch(err => console.log("error while getting  the albums", err))
})

router.get('/tracks/:albumId', (req, res, next) => {
  // Get tracks in an album
spotifyApi.getAlbumTracks(req.params.albumId)
.then(data => {
  // console.log('=====track =======', data.body);
  res.render('tracks', { tracks: data.body.items })
  })
  .catch(err => console.log("error while getting  the tracks", err))
  })


module.exports = router;
