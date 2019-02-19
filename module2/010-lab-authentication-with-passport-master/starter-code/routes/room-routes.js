const express         = require('express');
// Require user model
const User            = require('../models/user');
const router          = express.Router();
const Room            = require('../models/room-model');

const fileUploader = require('../config/upload-setup/cloudinary');


router.get('/rooms/add', isLoggedIn, (req, res, next) => {
  res.render('room-pages/addRoom');
});

//                          <input type="file" name="imageUrl" id=""
//                                                    |
router.post('/create-room', fileUploader.single('imageUrl'), (req, res, next) => {
  // console.log('body: ', req.body);
  // console.log('----------------------');
  // console.log('file:', req.file);
  const { name, description } = req.body;
  Room.create({
    name,
    description,
    imageUrl: req.file.secure_url,
    owner: req.user._id
  })
  .then( newRoom => {
    res.redirect('/rooms');
  })
  .catch( err => next(err)) //
})

function isLoggedIn(req, res, next){
  if(req.user){
    next()
  } else {
    res.redirect('/login');
  }
}
//https://res.cloudinary.com/dvnfnri9o/image/upload/v1550519901/rooms-gallery/IMG-20151114-WA0030%20weding%20Miler%20.jpeg.jpg
module.exports = router;