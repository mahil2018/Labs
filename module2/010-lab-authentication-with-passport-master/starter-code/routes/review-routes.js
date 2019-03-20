const express = require('express');
const router  = express.Router();
const Room = require('../models/room-model');
const Review = require('../models/review-model');


// create a new review
router.post('/rooms/:roomId/add-review', (req, res, next) => {
  // step 1: create a new review
  Review.create({
    user        : req.user._id,
    comment     : req.body.comment,
  })
  .then(newComment => {
    // step 2: find the room that the new comment belongs to
    Room.findById(req.params.roomId)
    .then(foundRoom => {
      // when find the room, push the ID of the new comment into the 'reviews' array
      foundRoom.reviews.push(newComment._id);
      // step 3: save the changes you just made in the found room
      foundRoom.save()
      .then(() => {
        res.redirect(`/rooms/${foundRoom._id}`)
      })
      .catch(err => next(err));
    })
    .catch(err => next(err));
  })
  .catch(err => next(err));
})


// delete review
// since we have saved reviews inside reviews collection and as array of ids in the rooms' reviews,
// we have to make sure when deleted, the review disappears from the reviews collection and from
// the room's reviews array
router.post('/reviews/:id', (req, res, next) => {
  Review.findByIdAndDelete(req.params.id) // <--- deleting review from reviews collection
  .then(() => {
    Room.findOne({'reviews': req.params.id}) // <--- find a room that has the review we deleted from the collections
    .then(foundRoom => {

      // loop through all the reviews and when find matching ids...
      for(let i=0; i< foundRoom.reviews.length; i++ ){
        console.log(foundRoom.reviews[i]._id.equals(req.params.id))
        if(foundRoom.reviews[i]._id.equals(req.params.id)){
          // ... use method splice to delete that id from the array
          foundRoom.reviews.splice(i, 1);
        }
      }
      // make sure you save the changes in the room (you just deleted one review id from its array of reviews,
      // so that needs to be saved in the database)
      foundRoom.save()
      .then(() => {
        res.redirect(`/rooms/${foundRoom._id}`)
      })
      .catch(err => next(err))
    })
  })
})


module.exports = router;


const express        = require('express');
const router         = express.Router();
// Require user model
const User           = require('../models/user-model');
const Plan           = require('../models/plan-model');
const Routine        = require('../models/routine-model');

//
router.get("/:id", ensureAuthenticated, (req, res) => {
  Plan.findById(req.params.id)
    .then(plan =>{
      res.render("plans/plan-details", {plan});
    })
    .catch(err => console.log('Error while finding the plan: ', err));
  
})
//localhost:3000/fitness/5c7703ead9ff79e3f02e7fb8  ++++++++++++++++++++++++
//localhost:3000/fitness/one
router.get("/:planId/one", ensureAuthenticated, (req, res) => {  
  const planId = req.params.planId;  
  console.log('este: ', planId);
  res.render("routine/fitness/day1", { user: req.user, planId });   ///routine/fitness/day1
});

// User update routine
//localhost:3000/fitness/5c75b1ab33b63d96ff79050a/create
router.post("/:planId/create", ensureAuthenticated, (req, res) =>{
  const newRoutine = {
    water   : req.body.water,
    calories: req.body.calories,
    sleep   : req.body.sleep,
    exercise: req.body.exercise,
    member  : req.user._id
    }
  // console.log(' we are to see: ', req.body );
  Routine.create(newRoutine)
    .then(thenewRoutine =>{
      User.findById(req.user._id)
      .then(foundUser =>{
        foundUser.routines.push(thenewRoutine._id);
        foundUser.save()
          .then(() => {
            res.redirect(`/fitness/${req.params.planId}/one`);
            // res.redirect('/user/profile')
          })
          .catch(err => console.log('Error while saving the user: ', err));
      })
      .catch(err => console.log('Error while saving the user: ', err));
    })
    .catch(err => console.log('Error while saving the user: ', err));
})
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login')
  }
}



module.exports = router;