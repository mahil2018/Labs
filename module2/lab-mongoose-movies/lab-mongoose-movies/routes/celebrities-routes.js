const express   = require('express');
const Celebrity = require('../models/celebrity-model');
// const Celebrity = require('../models/celebrity-model');
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
      res.render('celebrities/celebrities', {allCelebrities})
    })
    .catch(err => { console.log('Error while creating a new celebrity: ', err)});
    })

  
//====================

//See details of a celebrity
//localhost:3000/celebrities/5c579264643c2ff3f7d61b33
celebrityRouter.get('/:celebrityId', (req, res, next) => {
  // console.log('The celebrity Id: ', req.params.celebrityId)
  Celebrity.findById(req.params.celebrityId)
  .then(celebrityOne =>{
    // console.log('this is the celebrity:', celebrityOne);
    res.render('celebrities/celebrity-details', {details: celebrityOne})
  })
  .catch(err => { console.log('Error while showing a celebrity: ', err)});
  })

//=================
//Update Existing celebrities
celebrityRouter.get('/modify/:id', (req, res, next) =>{
  // console.log('update id:', req.params.id);
  Celebrity.findById(req.params.id)
  .then(celebrityUpdate =>{
    // console.log('this is the celebrity:', celebrityOne);
    res.render('celebrities/celebrity-update', {celebrityUpdate})
  })
  .catch(err => { console.log('Error while showing a celebrity: ', err)});
  })

//localhost:3000/celebrities/modify/
//localhost:3000/celebrities/modify/5c579264643c2ff3f7d61b33
celebrityRouter.post('/modify/:id', (req,res,next) =>{
  // console.log('modificando a : ', req.body);
  // console.log('show me id:', req.params.id);
  Celebrity.findByIdAndUpdate(req.params.id, req.body)
  .then(changeCel =>{
    res.redirect(`/celebrities/${req.params.id}`)
    // console.log('modificando a : ', req.body);
  })
  .catch(err => { console.log('Error while updating a celebrity: ', err)});

})

//delete existing celebrities
//localhost:3000/celebrities/delete/5c579264643c2ff3f7d61b33  ..url params
celebrityRouter.post('/delete/:id', (req, res, next) =>{
  console.log('delete id:', req.params.id);
  Celebrity.findByIdAndRemove(req.params.id)
  .then(celebrityDelete =>{
    console.log('this is the celebrity:', celebrityDelete);
    res.redirect('/celebrities')
  })
  .catch(err => { console.log('Error while showing a celebrity: ', err)});
  })




module.exports = celebrityRouter