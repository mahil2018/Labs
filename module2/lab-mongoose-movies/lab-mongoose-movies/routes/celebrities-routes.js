const express   = require('express');
const Celebrity = require('../models/celebrity-model');
const celebrityRouter     = express.Router();


//localhost:3000/celebrities/new
celebrityRouter.get('/new', (req, res, next) =>{
  //views/celebrities/new-celebrity.hbs => physical path to the file
  //in res.render() we never have '/'
res.render('celebrities/new-celebrity');

  // Celebrity.find()
  //   .then(allCelebrities =>{
  //     console.log('Our list of celebrities are: ', allCelebrities)
  //     res.render('celebrities/index', {celebrities: allCelebrities})
  //   })
  //   .catch(err => { console.log('Error while getting authors: ', err)})
})
// Create a post route to pick up all the information from the form to create anew celebrity
///* <form action="/celebrities" method="POST */"

celebrityRouter.post('/', (req, res, next) => {
//if we dont' have the same names in the form as the ones we have in our model, then:
  //  Celebrity.create{{}
  //     name: req.body.celebrityName,
  //     occupation: req.body.celebrityOccupation,
  //     catchPhrase: req.body.catchPhrase
  //   })}
    Celebrity.create(req.body)
      .then(newCelebrity => {
        console.log("New celebrity created: ", newCelebrity);
        // res.redirect('/celebrities')
      })
      .catch(err => { console.log("Error while creating a new celebrity: ", err)});
  })

  //get all the celebrities from the DB
  celebrityRouter.get('/', (req,res,next) => {
    Celebrity.find()
    .then(allCelebrities =>{
      console.log('Our list of celebrities ares: ', allCelebrities)
      res.render('celebrities/index', {celebrities: allCelebrities})
    .catch(err => { console.log('Error while creating a new celebrity: ', err)});
    })

  })
//====================

// //Create celebrities
// celebrityRouter.get('/create', (req, res, next) =>{
//   res.render('celebrities/new')
// })




module.exports = celebrityRouter