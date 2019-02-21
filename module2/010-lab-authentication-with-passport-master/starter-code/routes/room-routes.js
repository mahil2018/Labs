const express         = require('express');
// Require user model
const User            = require('../models/user');
const router          = express.Router();
const Room            = require('../models/room-model');

const fileUploader = require('../config/upload-setup/cloudinary');

// GET route to display the form to create a room
router.get('/rooms/add', isLoggedIn, (req, res, next) => {
  res.render('room-pages/addRoom');
});

//                          <input type="file" name="imageUrl" id=""
//                                                    |
router.post('/create-room', fileUploader.single('imageUrl'), (req, res, next) => {
  //localhost:3000/create-room
  console.log('body: ', req.body);
  console.log('----------------------');
  console.log('file:', req.file);
  const { name, description } = req.body;
  Room.create({
    name,
    description,
    imageUrl: req.file.secure_url,
    owner: req.user._id
  })
  .then( newRoom => {
    console.log('room created: ', newRoom);
    res.redirect('/rooms');
  })
  .catch( err => next(err)) //
})


//https://res.cloudinary.com/dvnfnri9o/image/upload/v1550519901/rooms-gallery/IMG-20151114-WA0030%20weding%20Miler%20.jpeg.jpg

//show all the rooms
router.get('/rooms', (req, res, next) =>{
    console.log('Hello', req.body);
    // in the Room model, property 'owner is referencing the User model
    // so in the database collection 'rooms' one instance will have mongodb id saved into this property----
    // _id:Object
    Room.find().populate('owner')
    .then(roomsFromDB => {
      roomsFromDB.forEach(oneRoom => {
        // each room has the 'owner' property which is user's id
        // if owner (the id of the user who created a room) is the same as the currently logged in user
        // then create additional property in the oneRoom object (maybe isOwner is not the best one but ... 🤯)
        // and that will help you to allow that currently logged in user can edit and delete only the rooms they created
        // if there's a user in a session:
        if(req.user){
          if(oneRoom.owner.equals(req.user._id)){
            oneRoom.isOwner = true;
          }
        }
      })
      res.render('room-pages/room-list', { roomsFromDB })
    })
  .catch( err => next(err))
})

// Get the details of a specific room ===================================
router.get('/rooms/:roomId', isLoggedIn, (req, res, next) => {
  //here we need to populate owner field but as well
  Room.findById(req.params.roomId).populate('owner')
  //🎯 we need to populate 'reviews' field and the 'user' field that's inside the reviews 🎯
  .populate({path: 'reviews', populate: {path: 'user'}})
  .then(foundRoom => {
    console.log('==========', foundRoom);
    if (foundRoom.owner.equals(req.user._id)){
      foundRoom.isOwner = true;
    }
    //go through all the reviews and check which ones are creaed by currently logged in user
    Promise.all(foundRoom.reviews.filter(singleReview => {                    //            |
      if(singleReview.user._id.equals(req.user._id)){   // <--------------------------------|
        //and if that's the case, create new property in the each review that satisfies criteria
        //and use this property when looping throungh the array of reviews in hbs file to make sure
        // that logged in user can oly edit and delete the reviews they created
        singleReview.canBeChanged = true;
      }
      return singleReview;
      }))
      .then(() =>{
        res.render('room-pages/room-details', { room: foundRoom})
      })
      .catch( err => next(err))
  })
  .catch( err => next(err))
})

//detele a specific room
router.post('/rooms/:id/delete', (req, res, next) => {
  Room.findByIdAndDelete(req.params.id)
  .then(() => {
    res.redirect('/rooms');
  })
  .catch(err => next(err));
})


function isLoggedIn(req, res, next){
  if(req.user){
    next()
  } else {
    res.redirect('/login');
  }
}

module.exports = router;